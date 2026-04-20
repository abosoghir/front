using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.Tasks.GetTaskById;

public record GetTaskByIdRequest() : IRequest<Result<object>>;
