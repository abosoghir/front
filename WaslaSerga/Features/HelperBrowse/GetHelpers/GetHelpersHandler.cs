using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperBrowse.GetHelpers;

public class GetHelpersHandler : IRequestHandler<GetHelpersRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetHelpersRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
