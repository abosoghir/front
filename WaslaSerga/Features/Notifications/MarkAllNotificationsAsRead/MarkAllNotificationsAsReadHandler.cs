using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Notifications.MarkAllNotificationsAsRead;

public class MarkAllNotificationsAsReadHandler : IRequestHandler<MarkAllNotificationsAsReadRequest, Result<object>>
{
    public async Task<Result<object>> Handle(MarkAllNotificationsAsReadRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
