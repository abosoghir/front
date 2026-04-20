using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Reviews.GetReviewsForUser;

public class GetReviewsForUserHandler : IRequestHandler<GetReviewsForUserRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetReviewsForUserRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
