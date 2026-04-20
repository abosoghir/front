using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.Tasks.GetTasks;

public record GetTasksRequest() : IRequest<Result<object>>;
