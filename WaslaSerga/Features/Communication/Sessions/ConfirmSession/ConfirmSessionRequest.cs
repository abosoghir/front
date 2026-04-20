using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Sessions.ConfirmSession;

public record ConfirmSessionRequest() : IRequest<Result<object>>;
