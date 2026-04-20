using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.ProfileManagement.UpdateMyProfile;

public class UpdateMyProfileHandler : IRequestHandler<UpdateMyProfileRequest, Result<object>>
{
    public async Task<Result<object>> Handle(UpdateMyProfileRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
