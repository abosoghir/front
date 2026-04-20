using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.Tasks.CompleteTask;

public record CompleteTaskRequest() : IRequest<Result<object>>;
