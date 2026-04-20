using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperBrowse.RecommendHelpers;

public class RecommendHelpersHandler : IRequestHandler<RecommendHelpersRequest, Result<object>>
{
    public async Task<Result<object>> Handle(RecommendHelpersRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
