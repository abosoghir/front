using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using WaslaSerga.Common;
using WaslaSerga.Entities.Identity;

namespace WaslaSerga.Features.ProfileManagement.User.GetMyProfile;

public class GetMyProfileHandler : IRequestHandler<GetMyProfileRequest, Result<MyProfileResponse>>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public GetMyProfileHandler(UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor)
    {
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<Result<MyProfileResponse>> Handle(GetMyProfileRequest request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            return Result.Failure<MyProfileResponse>(Error.Unauthorized("User.Unauthorized", "User could not be identified."));

        var user = await _userManager.Users
            .Include(u => u.HelperProfile)
            .Include(u => u.SeekerProfile)
            .FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
            
        if (user == null)
            return Result.Failure<MyProfileResponse>(Error.NotFound("User.NotFound", "User not found."));

        var response = new MyProfileResponse(
            Id: user.Id,
            Name: user.Name,
            Email: user.Email ?? string.Empty,
            PhoneNumber: user.PhoneNumber ?? string.Empty,
            ProfilePictureUrl: user.ProfilePictureUrl,
            Bio: user.Bio,
            Country: user.Country,
            City: user.City,
            WebsiteUrl: user.WebsiteUrl,
            LinkedInUrl: user.LinkedInUrl,
            GithubUrl: user.GitHubUrl,
            IsSeeker: user.SeekerProfile != null,
            IsHelper: user.HelperProfile != null,
            CreatedOn: user.CreatedOn
        );

        return Result.Success(response);
    }
}
