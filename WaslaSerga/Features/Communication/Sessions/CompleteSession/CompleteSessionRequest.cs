using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Sessions.CompleteSession;

public record CompleteSessionRequest() : IRequest<Result<object>>;
