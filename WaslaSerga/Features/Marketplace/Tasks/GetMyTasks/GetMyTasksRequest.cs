using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.Tasks.GetMyTasks;

public record GetMyTasksRequest() : IRequest<Result<object>>;
