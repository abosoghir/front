using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperBrowse.RecommendHelpers;

public record RecommendHelpersRequest() : IRequest<Result<object>>;
