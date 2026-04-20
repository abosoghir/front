using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Notifications.MarkNotificationAsRead;

public record MarkNotificationAsReadRequest() : IRequest<Result<object>>;
