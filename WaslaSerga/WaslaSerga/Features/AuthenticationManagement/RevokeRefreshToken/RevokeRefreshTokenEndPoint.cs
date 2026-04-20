using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WaslaSerga.Common;

namespace WaslaSerga.Features.AuthenticationManagement.RevokeRefreshToken;

[Route("api/auth")]
[ApiController]
[Authorize]
public class RevokeRefreshTokenEndPoint : ControllerBase
{
    private readonly IMediator _mediator;

    public RevokeRefreshTokenEndPoint(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("revoke-refresh-token")]
    public async Task<IActionResult> RevokeRefreshToken([FromBody] RevokeRefreshTokenRequest request, CancellationToken ct)
    {
        var result = await _mediator.Send(request, ct);
        return result.ToResponse();
    }
}
