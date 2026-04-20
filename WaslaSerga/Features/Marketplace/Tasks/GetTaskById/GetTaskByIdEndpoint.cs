using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.Tasks.GetTaskById;

[Route("api/[controller]")]
[ApiController]
// [Authorize]
public class GetTaskByIdEndpoint(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    // TODO: Map exact HTTP method and route from spec
    [HttpPost] 
    public async Task<IActionResult> Handle([FromBody] GetTaskByIdRequest request, CancellationToken ct)
    {
        var result = await _mediator.Send(request, ct);
        return result.ToResponse();
    }
}
