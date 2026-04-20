using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.Tasks.GetTaskById;

public class GetTaskByIdHandler : IRequestHandler<GetTaskByIdRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetTaskByIdRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
