using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Sessions.CreateSession;

public class CreateSessionHandler : IRequestHandler<CreateSessionRequest, Result<object>>
{
    public async Task<Result<object>> Handle(CreateSessionRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
