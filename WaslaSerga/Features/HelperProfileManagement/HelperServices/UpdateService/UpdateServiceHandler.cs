using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperServices.UpdateService;

public class UpdateServiceHandler : IRequestHandler<UpdateServiceRequest, Result<object>>
{
    public async Task<Result<object>> Handle(UpdateServiceRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
