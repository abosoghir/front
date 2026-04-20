using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Sessions.CancelSession;

public record CancelSessionRequest() : IRequest<Result<object>>;
