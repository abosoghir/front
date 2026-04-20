using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.AI.Chat;

public record ChatRequest() : IRequest<Result<object>>;
