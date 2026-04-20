using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperProjects.UpdateProject;

public class UpdateProjectHandler : IRequestHandler<UpdateProjectRequest, Result<object>>
{
    public async Task<Result<object>> Handle(UpdateProjectRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
