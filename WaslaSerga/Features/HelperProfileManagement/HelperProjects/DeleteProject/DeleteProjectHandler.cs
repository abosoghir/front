using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperProjects.DeleteProject;

public class DeleteProjectHandler : IRequestHandler<DeleteProjectRequest, Result<object>>
{
    public async Task<Result<object>> Handle(DeleteProjectRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
