using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Sessions.CreateSession;

public record CreateSessionRequest() : IRequest<Result<object>>;
