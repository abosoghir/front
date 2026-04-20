using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.Tasks.DeleteTask;

public class DeleteTaskHandler : IRequestHandler<DeleteTaskRequest, Result<object>>
{
    public async Task<Result<object>> Handle(DeleteTaskRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
