using MediatR;
using Microsoft.AspNetCore.Identity;
using WaslaSerga.Common;
using WaslaSerga.Entities.Identity;
using WaslaSerga.Services;

namespace WaslaSerga.Features.AuthenticationManagement.Login;

public class LoginHandler : IRequestHandler<LoginRequest, Result<LoginResponse>>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ITokenService _tokenService;

    public LoginHandler(UserManager<ApplicationUser> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    public async Task<Result<LoginResponse>> Handle(LoginRequest request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        
        if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
        {
            return Result.Failure<LoginResponse>(Error.Validation("Auth.Failed", "Invalid email or password."));
        }

        var roles = await _userManager.GetRolesAsync(user);
        
        var token = _tokenService.GenerateJwtToken(user, roles);
        var refreshToken = _tokenService.GenerateRefreshToken();
        
        // Save refresh token logic would go here if we tracked it in DB (e.g. Identity provider tokens)
        
        var response = new LoginResponse(
            Id: user.Id,
            Email: user.Email ?? string.Empty,
            Name: user.Name,
            PhoneNumber: user.PhoneNumber ?? string.Empty,
            Roles: roles.ToList(),
            Token: token,
            ExpirseIn: 3600,
            RefreshToken: refreshToken,
            RefreshTokenExpiration: DateTime.UtcNow.AddDays(7)
        );

        return Result.Success(response);
    }
}
