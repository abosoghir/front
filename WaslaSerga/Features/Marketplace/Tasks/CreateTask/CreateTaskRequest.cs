using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.Tasks.CreateTask;

public record CreateTaskRequest() : IRequest<Result<object>>;
