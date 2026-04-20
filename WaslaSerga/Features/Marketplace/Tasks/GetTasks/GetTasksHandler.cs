using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.Tasks.GetTasks;

public class GetTasksHandler : IRequestHandler<GetTasksRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetTasksRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
