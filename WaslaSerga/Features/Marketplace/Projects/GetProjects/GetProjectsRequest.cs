using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.Projects.GetProjects;

public record GetProjectsRequest() : IRequest<Result<object>>;
