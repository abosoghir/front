using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.ProfileManagement.GetMyProfile;

public record GetMyProfileRequest() : IRequest<Result<object>>;
