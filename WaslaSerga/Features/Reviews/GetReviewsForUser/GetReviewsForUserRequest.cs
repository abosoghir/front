using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Reviews.GetReviewsForUser;

public record GetReviewsForUserRequest() : IRequest<Result<object>>;
