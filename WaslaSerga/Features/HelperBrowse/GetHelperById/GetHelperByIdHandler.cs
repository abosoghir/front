using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperBrowse.GetHelperById;

public class GetHelperByIdHandler : IRequestHandler<GetHelperByIdRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetHelperByIdRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
