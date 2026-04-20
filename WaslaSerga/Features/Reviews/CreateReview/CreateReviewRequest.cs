using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Reviews.CreateReview;

public record CreateReviewRequest() : IRequest<Result<object>>;
