using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperProjects.GetHelperProjects;

public class GetHelperProjectsHandler : IRequestHandler<GetHelperProjectsRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetHelperProjectsRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
