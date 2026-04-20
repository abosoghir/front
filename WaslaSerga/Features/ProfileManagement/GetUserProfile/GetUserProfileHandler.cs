using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.ProfileManagement.GetUserProfile;

public class GetUserProfileHandler : IRequestHandler<GetUserProfileRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetUserProfileRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
