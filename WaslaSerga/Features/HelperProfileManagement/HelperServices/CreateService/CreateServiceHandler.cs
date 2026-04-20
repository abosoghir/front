using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperServices.CreateService;

public class CreateServiceHandler : IRequestHandler<CreateServiceRequest, Result<object>>
{
    public async Task<Result<object>> Handle(CreateServiceRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
