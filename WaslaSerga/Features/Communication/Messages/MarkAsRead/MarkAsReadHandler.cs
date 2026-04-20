using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Messages.MarkAsRead;

public class MarkAsReadHandler : IRequestHandler<MarkAsReadRequest, Result<object>>
{
    public async Task<Result<object>> Handle(MarkAsReadRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
