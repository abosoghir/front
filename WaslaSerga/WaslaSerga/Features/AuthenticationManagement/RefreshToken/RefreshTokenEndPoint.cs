using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WaslaSerga.Common;

namespace WaslaSerga.Features.AuthenticationManagement.RefreshToken;

[Route("api/auth")]
[ApiController]
[AllowAnonymous]
public class RefreshTokenEndPoint : ControllerBase
{
    private readonly IMediator _mediator;

    public RefreshTokenEndPoint(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request, CancellationToken ct)
    {
        var result = await _mediator.Send(request, ct);
        return result.ToResponse();
    }
}
