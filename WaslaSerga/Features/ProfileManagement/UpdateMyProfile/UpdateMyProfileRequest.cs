using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.ProfileManagement.UpdateMyProfile;

public record UpdateMyProfileRequest() : IRequest<Result<object>>;
