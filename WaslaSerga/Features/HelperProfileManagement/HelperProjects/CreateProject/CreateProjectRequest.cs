using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperProjects.CreateProject;

public record CreateProjectRequest() : IRequest<Result<object>>;
