using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WaslaSerga.Common;
using WaslaSerga.Entities.Identity;

namespace WaslaSerga.Features.ProfileManagement.User.GetUserProfile;

public class GetUserProfileHandler : IRequestHandler<GetUserProfileRequest, Result<UserProfileResponse>>
{
    private readonly UserManager<ApplicationUser> _userManager;

    public GetUserProfileHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<Result<UserProfileResponse>> Handle(GetUserProfileRequest request, CancellationToken cancellationToken)
    {
        var user = await _userManager.Users
            .Include(u => u.HelperProfile)
            .Include(u => u.SeekerProfile)
            .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);
            
        if (user == null)
            return Result.Failure<UserProfileResponse>(Error.NotFound("User.NotFound", "User not found."));

        var response = new UserProfileResponse(
            Id: user.Id,
            Name: user.Name,
            ProfilePictureUrl: user.ProfilePictureUrl,
            Bio: user.Bio,
            IsSeeker: user.SeekerProfile != null,
            IsHelper: user.HelperProfile != null,
            CreatedOn: user.CreatedOn
        );

        return Result.Success(response);
    }
}
