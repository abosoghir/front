using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Messages.GetConversations;

public class GetConversationsHandler : IRequestHandler<GetConversationsRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetConversationsRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
