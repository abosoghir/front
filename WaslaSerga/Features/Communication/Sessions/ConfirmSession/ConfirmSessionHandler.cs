using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Sessions.ConfirmSession;

public class ConfirmSessionHandler : IRequestHandler<ConfirmSessionRequest, Result<object>>
{
    public async Task<Result<object>> Handle(ConfirmSessionRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
