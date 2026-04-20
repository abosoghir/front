using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperBrowse.GetHelpers;

public record GetHelpersRequest() : IRequest<Result<object>>;
