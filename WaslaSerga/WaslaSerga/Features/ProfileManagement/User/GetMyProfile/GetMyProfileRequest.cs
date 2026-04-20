using MediatR;
using WaslaSerga.Common;

namespace WaslaSerga.Features.ProfileManagement.User.GetMyProfile;

public record GetMyProfileRequest() : IRequest<Result<MyProfileResponse>>;

public record MyProfileResponse(
    string Id,
    string Name,
    string Email,
    string PhoneNumber,
    string? ProfilePictureUrl,
    string? Bio,
    string? Country,
    string? City,
    string? WebsiteUrl,
    string? LinkedInUrl,
    string? GithubUrl,
    bool IsSeeker,
    bool IsHelper,
    DateTime CreatedOn
);
