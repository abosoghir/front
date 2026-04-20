using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.AuthenticationManagement.Login;

public class LoginHandler : IRequestHandler<LoginRequest, Result<object>>
{
    public async Task<Result<object>> Handle(LoginRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
