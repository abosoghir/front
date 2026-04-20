using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperBrowse.GetHelperById;

public record GetHelperByIdRequest() : IRequest<Result<object>>;
