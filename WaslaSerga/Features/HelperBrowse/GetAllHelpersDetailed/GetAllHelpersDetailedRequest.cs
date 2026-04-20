using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperBrowse.GetAllHelpersDetailed;

public record GetAllHelpersDetailedRequest() : IRequest<Result<object>>;
