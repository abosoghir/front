using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.AuthenticationManagement.ChangePassword;

public class ChangePasswordHandler : IRequestHandler<ChangePasswordRequest, Result<object>>
{
    public async Task<Result<object>> Handle(ChangePasswordRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
