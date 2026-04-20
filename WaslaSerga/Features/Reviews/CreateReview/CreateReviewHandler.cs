using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Reviews.CreateReview;

public class CreateReviewHandler : IRequestHandler<CreateReviewRequest, Result<object>>
{
    public async Task<Result<object>> Handle(CreateReviewRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
