using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WaslaSerga.Common;

namespace WaslaSerga.Features.ProfileManagement.User.UpdateUserProfile;

[Route("api/profile")]
[ApiController]
[Authorize]
public class UpdateUserProfileEndPoint : ControllerBase
{
    private readonly IMediator _mediator;

    public UpdateUserProfileEndPoint(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPut("me")]
    public async Task<IActionResult> UpdateUserProfile([FromBody] UpdateUserProfileRequest request, CancellationToken ct)
    {
        var result = await _mediator.Send(request, ct);
        return result.ToResponse();
    }
}
