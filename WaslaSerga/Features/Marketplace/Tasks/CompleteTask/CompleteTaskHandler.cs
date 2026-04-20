using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.Tasks.CompleteTask;

public class CompleteTaskHandler : IRequestHandler<CompleteTaskRequest, Result<object>>
{
    public async Task<Result<object>> Handle(CompleteTaskRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
