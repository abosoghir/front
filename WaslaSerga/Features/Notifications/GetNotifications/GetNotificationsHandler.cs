using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Notifications.GetNotifications;

public class GetNotificationsHandler : IRequestHandler<GetNotificationsRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetNotificationsRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
