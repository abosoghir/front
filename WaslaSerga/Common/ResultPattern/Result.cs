using Microsoft.AspNetCore.Mvc;

namespace WaslaSerga.Common.ResultPattern;

public class Result
{
    public bool IsSuccess { get; }
    public bool IsFailure => !IsSuccess;
    public Error Error { get; }

    protected Result(bool isSuccess, Error error)
    {
        if (isSuccess && error != Error.None)
            throw new InvalidOperationException();
        if (!isSuccess && error == Error.None)
            throw new InvalidOperationException();

        IsSuccess = isSuccess;
        Error = error;
    }

    public static Result Success() => new(true, Error.None);
    public static Result<T> Success<T>(T value) => new(value, true, Error.None);
    public static Result Failure(Error error) => new(false, error);
    public static Result<T> Failure<T>(Error error) => new(default, false, error);
}

public class Result<T> : Result
{
    private readonly T? _value;

    protected internal Result(T? value, bool isSuccess, Error error)
        : base(isSuccess, error)
    {
        _value = value;
    }

    public T Value => IsSuccess
        ? _value!
        : throw new InvalidOperationException("The value of a failure result can not be accessed.");
}

public static class ResultExtensions
{
    public static IActionResult ToResponse(this Result result)
    {
        if (result.IsSuccess)
        {
            return new OkObjectResult(new
            {
                isSuccess = true,
                hasData = false
            });
        }

        return CreateErrorResponse(result.Error);
    }

    public static IActionResult ToResponse<T>(this Result<T> result)
    {
        if (result.IsSuccess)
        {
            return new OkObjectResult(new
            {
                isSuccess = true,
                hasData = typeof(T) != typeof(object),
                data = result.Value
            });
        }

        return CreateErrorResponse(result.Error);
    }

    private static IActionResult CreateErrorResponse(Error error)
    {
        var statusCode = error.Type switch
        {
            ErrorType.Validation => StatusCodes.Status400BadRequest,
            ErrorType.NotFound => StatusCodes.Status404NotFound,
            ErrorType.Conflict => StatusCodes.Status409Conflict,
            _ => StatusCodes.Status500InternalServerError
        };

        return new ObjectResult(new
        {
            isSuccess = false,
            statusCode,
            error = new
            {
                code = error.Code,
                description = error.Description
            }
        })
        {
            StatusCode = statusCode
        };
    }
}
