using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.AuthenticationManagement.RefreshToken;

public class RefreshTokenHandler : IRequestHandler<RefreshTokenRequest, Result<object>>
{
    public async Task<Result<object>> Handle(RefreshTokenRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
