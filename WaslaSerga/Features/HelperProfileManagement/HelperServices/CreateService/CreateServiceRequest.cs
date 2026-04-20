using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperServices.CreateService;

public record CreateServiceRequest() : IRequest<Result<object>>;
