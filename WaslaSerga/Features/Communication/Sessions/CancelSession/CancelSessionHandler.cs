using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Sessions.CancelSession;

public class CancelSessionHandler : IRequestHandler<CancelSessionRequest, Result<object>>
{
    public async Task<Result<object>> Handle(CancelSessionRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
