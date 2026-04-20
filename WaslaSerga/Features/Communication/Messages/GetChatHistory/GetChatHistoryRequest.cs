using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Messages.GetChatHistory;

public record GetChatHistoryRequest() : IRequest<Result<object>>;
