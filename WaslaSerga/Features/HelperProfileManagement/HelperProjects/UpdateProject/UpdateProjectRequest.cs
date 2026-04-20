using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperProjects.UpdateProject;

public record UpdateProjectRequest() : IRequest<Result<object>>;
