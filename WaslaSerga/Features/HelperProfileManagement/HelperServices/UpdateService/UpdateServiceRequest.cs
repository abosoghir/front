using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperServices.UpdateService;

public record UpdateServiceRequest() : IRequest<Result<object>>;
