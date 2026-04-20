using MediatR;
using WaslaSerga.Common;
using WaslaSerga.Features.AuthenticationManagement.Login;

namespace WaslaSerga.Features.AuthenticationManagement.RefreshToken;

public record RefreshTokenRequest(string Token, string RefreshToken) : IRequest<Result<LoginResponse>>;
