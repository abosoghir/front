using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WaslaSerga.Common;

namespace WaslaSerga.Features.ProfileManagement.User.GetUserProfile;

[Route("api/users")]
[ApiController]
[AllowAnonymous]
public class GetUserProfileEndPoint : ControllerBase
{
    private readonly IMediator _mediator;

    public GetUserProfileEndPoint(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("{userId}/profile")]
    public async Task<IActionResult> GetUserProfile(string userId, CancellationToken ct)
    {
        var result = await _mediator.Send(new GetUserProfileRequest(userId), ct);
        return result.ToResponse();
    }
}
