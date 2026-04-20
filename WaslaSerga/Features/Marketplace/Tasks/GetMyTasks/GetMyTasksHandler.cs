using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.Tasks.GetMyTasks;

public class GetMyTasksHandler : IRequestHandler<GetMyTasksRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetMyTasksRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
