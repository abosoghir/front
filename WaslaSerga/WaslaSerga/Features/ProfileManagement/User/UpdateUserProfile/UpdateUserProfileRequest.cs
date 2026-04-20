using MediatR;
using WaslaSerga.Common;

namespace WaslaSerga.Features.ProfileManagement.User.UpdateUserProfile;

public record UpdateUserProfileRequest(
    string Name,
    string? Bio,
    string? ProfilePictureUrl,
    string? PhoneNumber,
    string? Country,
    string? City,
    string? WebsiteUrl,
    string? LinkedInUrl,
    string? GithubUrl,
    string? CvUrl
) : IRequest<Result>;
