using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.AI.Chat;

public class ChatHandler : IRequestHandler<ChatRequest, Result<object>>
{
    public async Task<Result<object>> Handle(ChatRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
