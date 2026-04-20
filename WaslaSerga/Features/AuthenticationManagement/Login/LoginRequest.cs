using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.AuthenticationManagement.Login;

public record LoginRequest() : IRequest<Result<object>>;
