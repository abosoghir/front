using Microsoft.AspNetCore.Mvc;

namespace WaslaSerga.Common;

public class Result
{
    public bool IsSuccess { get; }
    public bool HasData { get; protected set; }
    public Error Error { get; }

    protected Result(bool isSuccess, Error error)
    {
        if (isSuccess && error != Error.None)
            throw new InvalidOperationException("Successful result cannot contain an error.");
        if (!isSuccess && error == Error.None)
            throw new InvalidOperationException("Failed result must contain an error.");

        IsSuccess = isSuccess;
        HasData = false;
        Error = error;
    }

    public static Result Success() => new(true, Error.None);
    public static Result<T> Success<T>(T value) => new(value, true, Error.None);
    public static Result Failure(Error error) => new(false, error);
    public static Result<T> Failure<T>(Error error) => new(default!, false, error);
}

public class Result<T> : Result
{
    private readonly T _value;

    protected internal Result(T value, bool isSuccess, Error error) : base(isSuccess, error)
    {
        _value = value;
        HasData = value != null;
    }

    public T Data => IsSuccess 
        ? _value! 
        : throw new InvalidOperationException("Cannot access data of a failed result.");
}

public static class ResultExtensions
{
    public static IActionResult ToResponse(this Result result)
    {
        if (result.IsSuccess)
        {
            return new OkObjectResult(new { isSuccess = true, hasData = false });
        }

        var statusCode = result.Error.Code.Contains("NotFound", StringComparison.OrdinalIgnoreCase) ? 404 :
                         result.Error.Code.Contains("Validation", StringComparison.OrdinalIgnoreCase) ? 400 :
                         result.Error.Code.Contains("Unauthorized", StringComparison.OrdinalIgnoreCase) ? 401 :
                         400;

        return new ObjectResult(new { isSuccess = false, statusCode, error = new { code = result.Error.Code, description = result.Error.Description } })
        {
            StatusCode = statusCode
        };
    }

    public static IActionResult ToResponse<T>(this Result<T> result)
    {
        if (result.IsSuccess)
        {
            return new OkObjectResult(new { isSuccess = true, hasData = true, data = result.Data });
        }

        var statusCode = result.Error.Code.Contains("NotFound", StringComparison.OrdinalIgnoreCase) ? 404 :
                         result.Error.Code.Contains("Validation", StringComparison.OrdinalIgnoreCase) ? 400 :
                         result.Error.Code.Contains("Unauthorized", StringComparison.OrdinalIgnoreCase) ? 401 :
                         400;

        return new ObjectResult(new { isSuccess = false, statusCode, error = new { code = result.Error.Code, description = result.Error.Description } })
        {
            StatusCode = statusCode
        };
    }
}
