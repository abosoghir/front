using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperServices.GetHelperServices;

public class GetHelperServicesHandler : IRequestHandler<GetHelperServicesRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetHelperServicesRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
