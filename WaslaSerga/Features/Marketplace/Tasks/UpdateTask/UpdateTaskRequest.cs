using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.Tasks.UpdateTask;

public record UpdateTaskRequest() : IRequest<Result<object>>;
