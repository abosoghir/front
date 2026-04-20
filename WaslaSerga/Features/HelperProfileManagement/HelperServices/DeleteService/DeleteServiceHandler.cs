using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperServices.DeleteService;

public class DeleteServiceHandler : IRequestHandler<DeleteServiceRequest, Result<object>>
{
    public async Task<Result<object>> Handle(DeleteServiceRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
