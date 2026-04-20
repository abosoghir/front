using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperProjects.DeleteProject;

public record DeleteProjectRequest() : IRequest<Result<object>>;
