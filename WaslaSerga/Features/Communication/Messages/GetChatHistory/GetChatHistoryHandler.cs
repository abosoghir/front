using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Messages.GetChatHistory;

public class GetChatHistoryHandler : IRequestHandler<GetChatHistoryRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetChatHistoryRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
