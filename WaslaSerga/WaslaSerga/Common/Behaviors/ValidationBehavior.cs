using FluentValidation;
using MediatR;

namespace WaslaSerga.Common.Behaviors;

public class ValidationBehavior<TRequest, TResponse>(IEnumerable<IValidator<TRequest>> validators) : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if (!validators.Any())
            return await next();

        var context = new ValidationContext<TRequest>(request);
        var validationResults = await Task.WhenAll(
            validators.Select(v => v.ValidateAsync(context, cancellationToken)));
            
        var failures = validationResults
            .SelectMany(r => r.Errors)
            .Where(f => f != null)
            .ToList();

        if (failures.Count != 0)
        {
            var firstFailure = failures.First();
            var error = Error.Validation("ValidationError", firstFailure.ErrorMessage);

            // If TResponse is Result or Result<T>, we can use reflection to return a failed result
            if (typeof(TResponse).IsGenericType && typeof(TResponse).GetGenericTypeDefinition() == typeof(Result<>))
            {
                var resultType = typeof(TResponse).GetGenericArguments()[0];
                var method = typeof(Result).GetMethods().First(m => m.Name == "Failure" && m.IsGenericMethod);
                var genericMethod = method.MakeGenericMethod(resultType);
                return (TResponse)genericMethod.Invoke(null, new object[] { error })!;
            }
            if (typeof(TResponse) == typeof(Result))
            {
                return (TResponse)(object)Result.Failure(error);
            }

            throw new ValidationException(failures);
        }

        return await next();
    }
}
