using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Notifications.MarkAllNotificationsAsRead;

public record MarkAllNotificationsAsReadRequest() : IRequest<Result<object>>;
