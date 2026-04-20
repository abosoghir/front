using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.AuthenticationManagement.Register;

public record RegisterRequest() : IRequest<Result<object>>;
