using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Notifications.MarkAllNotificationsAsRead;

[Route("api/[controller]")]
[ApiController]
// [Authorize]
public class MarkAllNotificationsAsReadEndpoint(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    // TODO: Map exact HTTP method and route from spec
    [HttpPost] 
    public async Task<IActionResult> Handle([FromBody] MarkAllNotificationsAsReadRequest request, CancellationToken ct)
    {
        var result = await _mediator.Send(request, ct);
        return result.ToResponse();
    }
}
