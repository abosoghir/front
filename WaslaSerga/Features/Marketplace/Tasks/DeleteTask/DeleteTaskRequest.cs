using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.Tasks.DeleteTask;

public record DeleteTaskRequest() : IRequest<Result<object>>;
