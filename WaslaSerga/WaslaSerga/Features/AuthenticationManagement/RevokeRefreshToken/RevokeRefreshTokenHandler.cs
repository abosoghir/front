using MediatR;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using WaslaSerga.Common;

namespace WaslaSerga.Features.AuthenticationManagement.RevokeRefreshToken;

public class RevokeRefreshTokenHandler : IRequestHandler<RevokeRefreshTokenRequest, Result>
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public RevokeRefreshTokenHandler(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<Result> Handle(RevokeRefreshTokenRequest request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            return Result.Failure(Error.Unauthorized("User.Unauthorized", "User is not authorized."));

        // If we stored refresh tokens in DB, we'd delete or revoke it here.
        // For WaslaSerga prompt implementation:
        await Task.CompletedTask;

        return Result.Success();
    }
}
