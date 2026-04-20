using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Messages.SendMessage;

public record SendMessageRequest() : IRequest<Result<object>>;
