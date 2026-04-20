using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Sessions.GetSessions;

public record GetSessionsRequest() : IRequest<Result<object>>;
