using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Messages.SendMessage;

public class SendMessageHandler : IRequestHandler<SendMessageRequest, Result<object>>
{
    public async Task<Result<object>> Handle(SendMessageRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
