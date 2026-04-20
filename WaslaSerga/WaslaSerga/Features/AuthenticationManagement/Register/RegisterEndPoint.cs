using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WaslaSerga.Common;

namespace WaslaSerga.Features.AuthenticationManagement.Register;

[Route("api/auth")]
[ApiController]
[AllowAnonymous]
public class RegisterEndPoint : ControllerBase
{
    private readonly IMediator _mediator;

    public RegisterEndPoint(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request, CancellationToken ct)
    {
        var result = await _mediator.Send(request, ct);
        return result.ToResponse();
    }
}
