using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.Tasks.UpdateTask;

public class UpdateTaskHandler : IRequestHandler<UpdateTaskRequest, Result<object>>
{
    public async Task<Result<object>> Handle(UpdateTaskRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
