using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.ProfileManagement.GetMyProfile;

public class GetMyProfileHandler : IRequestHandler<GetMyProfileRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetMyProfileRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
