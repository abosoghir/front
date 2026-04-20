using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperBrowse.GetAllHelpersDetailed;

public class GetAllHelpersDetailedHandler : IRequestHandler<GetAllHelpersDetailedRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetAllHelpersDetailedRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
