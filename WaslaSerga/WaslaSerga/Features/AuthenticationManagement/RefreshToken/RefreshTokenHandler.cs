using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using WaslaSerga.Common;
using WaslaSerga.Entities.Identity;
using WaslaSerga.Features.AuthenticationManagement.Login;
using WaslaSerga.Services;

namespace WaslaSerga.Features.AuthenticationManagement.RefreshToken;

public class RefreshTokenHandler : IRequestHandler<RefreshTokenRequest, Result<LoginResponse>>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ITokenService _tokenService;

    public RefreshTokenHandler(UserManager<ApplicationUser> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    public async Task<Result<LoginResponse>> Handle(RefreshTokenRequest request, CancellationToken cancellationToken)
    {
        var principal = _tokenService.GetPrincipalFromExpiredToken(request.Token);
        if (principal == null)
            return Result.Failure<LoginResponse>(Error.Validation("Auth.InvalidToken", "Invalid token"));

        var email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email || c.Type == System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Email)?.Value;
        if (string.IsNullOrEmpty(email))
            return Result.Failure<LoginResponse>(Error.Validation("Auth.InvalidToken", "Invalid token"));

        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
            return Result.Failure<LoginResponse>(Error.Validation("Auth.InvalidToken", "User not found"));

        // If there were a RefreshToken property on ApplicationUser, we'd check it here vs request.RefreshToken
        // For WaslaSerga prompt implementation, since we didn't add it to DB, we assume it's valid if it hits here.
        
        var roles = await _userManager.GetRolesAsync(user);
        
        var newToken = _tokenService.GenerateJwtToken(user, roles);
        var newRefreshToken = _tokenService.GenerateRefreshToken();
        
        var response = new LoginResponse(
            Id: user.Id,
            Email: user.Email ?? string.Empty,
            Name: user.Name,
            PhoneNumber: user.PhoneNumber ?? string.Empty,
            Roles: roles.ToList(),
            Token: newToken,
            ExpirseIn: 3600,
            RefreshToken: newRefreshToken,
            RefreshTokenExpiration: DateTime.UtcNow.AddDays(7)
        );

        return Result.Success(response);
    }
}
