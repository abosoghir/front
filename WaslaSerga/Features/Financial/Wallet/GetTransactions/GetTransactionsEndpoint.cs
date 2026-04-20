using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Financial.Wallet.GetTransactions;

[Route("api/[controller]")]
[ApiController]
// [Authorize]
public class GetTransactionsEndpoint(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    // TODO: Map exact HTTP method and route from spec
    [HttpPost] 
    public async Task<IActionResult> Handle([FromBody] GetTransactionsRequest request, CancellationToken ct)
    {
        var result = await _mediator.Send(request, ct);
        return result.ToResponse();
    }
}
