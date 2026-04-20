using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperProjects.CreateProject;

public class CreateProjectHandler : IRequestHandler<CreateProjectRequest, Result<object>>
{
    public async Task<Result<object>> Handle(CreateProjectRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
