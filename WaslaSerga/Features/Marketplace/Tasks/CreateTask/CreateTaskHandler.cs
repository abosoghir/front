using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.Tasks.CreateTask;

public class CreateTaskHandler : IRequestHandler<CreateTaskRequest, Result<object>>
{
    public async Task<Result<object>> Handle(CreateTaskRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
