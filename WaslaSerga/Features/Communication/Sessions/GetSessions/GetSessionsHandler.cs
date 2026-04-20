using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Sessions.GetSessions;

public class GetSessionsHandler : IRequestHandler<GetSessionsRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetSessionsRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
