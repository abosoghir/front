using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.Projects.GetProjects;

public class GetProjectsHandler : IRequestHandler<GetProjectsRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetProjectsRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
