using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperProjects.GetHelperProjects;

public record GetHelperProjectsRequest() : IRequest<Result<object>>;
