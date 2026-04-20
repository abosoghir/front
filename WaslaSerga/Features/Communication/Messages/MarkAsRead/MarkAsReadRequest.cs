using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Communication.Messages.MarkAsRead;

public record MarkAsReadRequest() : IRequest<Result<object>>;
