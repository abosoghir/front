using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using WaslaSerga.Common;
using WaslaSerga.Entities.Identity;

namespace WaslaSerga.Features.ProfileManagement.User.UpdateUserProfile;

public class UpdateUserProfileHandler : IRequestHandler<UpdateUserProfileRequest, Result>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UpdateUserProfileHandler(UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor)
    {
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<Result> Handle(UpdateUserProfileRequest request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            return Result.Failure(Error.Unauthorized("User.Unauthorized", "User could not be identified."));

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return Result.Failure(Error.NotFound("User.NotFound", "User not found."));

        user.Name = request.Name;
        user.Bio = request.Bio;
        user.ProfilePictureUrl = request.ProfilePictureUrl;
        user.PhoneNumber = request.PhoneNumber ?? user.PhoneNumber;
        user.Country = request.Country;
        user.City = request.City;
        user.WebsiteUrl = request.WebsiteUrl;
        user.LinkedInUrl = request.LinkedInUrl;
        user.GitHubUrl = request.GithubUrl;
        user.CVUrl = request.CvUrl;

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            return Result.Failure(Error.Validation("Profile.UpdateFailed", errors));
        }

        return Result.Success();
    }
}
