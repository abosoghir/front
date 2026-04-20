using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WaslaSerga.Common;

namespace WaslaSerga.Features.AuthenticationManagement.ChangePassword;

[Route("api/auth")]
[ApiController]
[Authorize]
public class ChangePasswordEndPoint : ControllerBase
{
    private readonly IMediator _mediator;

    public ChangePasswordEndPoint(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPut("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request, CancellationToken ct)
    {
        var result = await _mediator.Send(request, ct);
        return result.ToResponse();
    }
}
