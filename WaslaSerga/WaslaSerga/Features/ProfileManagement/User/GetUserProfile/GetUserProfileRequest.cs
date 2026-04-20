using MediatR;
using WaslaSerga.Common;

namespace WaslaSerga.Features.ProfileManagement.User.GetUserProfile;

public record GetUserProfileRequest(string UserId) : IRequest<Result<UserProfileResponse>>;

public record UserProfileResponse(
    string Id,
    string Name,
    string? ProfilePictureUrl,
    string? Bio,
    bool IsSeeker,
    bool IsHelper,
    DateTime CreatedOn
);
