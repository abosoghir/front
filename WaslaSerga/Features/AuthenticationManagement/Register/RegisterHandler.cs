using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.AuthenticationManagement.Register;

public class RegisterHandler : IRequestHandler<RegisterRequest, Result<object>>
{
    public async Task<Result<object>> Handle(RegisterRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
