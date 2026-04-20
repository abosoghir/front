using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperServices.GetHelperServices;

public record GetHelperServicesRequest() : IRequest<Result<object>>;
