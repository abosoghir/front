using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Sessions.CompleteSession;

public class CompleteSessionHandler : IRequestHandler<CompleteSessionRequest, Result<object>>
{
    public async Task<Result<object>> Handle(CompleteSessionRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
