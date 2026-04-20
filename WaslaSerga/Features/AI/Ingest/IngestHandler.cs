using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.AI.Ingest;

public class IngestHandler : IRequestHandler<IngestRequest, Result<object>>
{
    public async Task<Result<object>> Handle(IngestRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
