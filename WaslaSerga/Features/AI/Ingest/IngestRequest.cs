using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.AI.Ingest;

public record IngestRequest() : IRequest<Result<object>>;
