using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperServices.DeleteService;

public record DeleteServiceRequest() : IRequest<Result<object>>;
