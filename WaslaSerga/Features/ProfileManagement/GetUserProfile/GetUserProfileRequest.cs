using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.ProfileManagement.GetUserProfile;

public record GetUserProfileRequest() : IRequest<Result<object>>;
