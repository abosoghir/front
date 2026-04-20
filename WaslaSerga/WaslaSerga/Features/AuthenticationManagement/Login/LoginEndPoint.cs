using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WaslaSerga.Common;

namespace WaslaSerga.Features.AuthenticationManagement.Login;

[Route("api/auth")]
[ApiController]
[AllowAnonymous]
public class LoginEndPoint : ControllerBase
{
    private readonly IMediator _mediator;

    public LoginEndPoint(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request, CancellationToken ct)
    {
        var result = await _mediator.Send(request, ct);
        return result.ToResponse();
    }
}
