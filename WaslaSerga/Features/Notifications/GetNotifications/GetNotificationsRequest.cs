using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Notifications.GetNotifications;

public record GetNotificationsRequest() : IRequest<Result<object>>;
