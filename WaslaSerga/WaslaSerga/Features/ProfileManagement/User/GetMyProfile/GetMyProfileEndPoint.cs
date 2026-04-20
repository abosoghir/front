using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WaslaSerga.Common;

namespace WaslaSerga.Features.ProfileManagement.User.GetMyProfile;

[Route("api/profile")]
[ApiController]
[Authorize]
public class GetMyProfileEndPoint : ControllerBase
{
    private readonly IMediator _mediator;

    public GetMyProfileEndPoint(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetMyProfile(CancellationToken ct)
    {
        var result = await _mediator.Send(new GetMyProfileRequest(), ct);
        return result.ToResponse();
    }
}
