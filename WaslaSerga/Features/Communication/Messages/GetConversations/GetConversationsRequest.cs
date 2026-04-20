using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Messages.GetConversations;

public record GetConversationsRequest() : IRequest<Result<object>>;
