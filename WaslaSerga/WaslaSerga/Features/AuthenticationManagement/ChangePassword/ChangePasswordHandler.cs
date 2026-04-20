using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using WaslaSerga.Common;
using WaslaSerga.Entities.Identity;

namespace WaslaSerga.Features.AuthenticationManagement.ChangePassword;

public class ChangePasswordHandler : IRequestHandler<ChangePasswordRequest, Result>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ChangePasswordHandler(UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor)
    {
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<Result> Handle(ChangePasswordRequest request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            return Result.Failure(Error.NotFound("User.NotFound", "User could not be identified from token."));

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return Result.Failure(Error.NotFound("User.NotFound", "User not found."));

        var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
        if (!result.Succeeded)
        {
             var errors = string.Join(", ", result.Errors.Select(e => e.Description));
             return Result.Failure(Error.Validation("Auth.ChangePasswordFailed", errors));
        }

        return Result.Success();
    }
}
