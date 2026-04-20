using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.AuthenticationManagement.RevokeRefreshToken;

public class RevokeRefreshTokenHandler : IRequestHandler<RevokeRefreshTokenRequest, Result<object>>
{
    public async Task<Result<object>> Handle(RevokeRefreshTokenRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
