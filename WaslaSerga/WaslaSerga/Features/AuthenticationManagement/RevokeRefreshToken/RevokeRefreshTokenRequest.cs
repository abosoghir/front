using MediatR;
using WaslaSerga.Common;

namespace WaslaSerga.Features.AuthenticationManagement.RevokeRefreshToken;

public record RevokeRefreshTokenRequest(string RefreshToken) : IRequest<Result>;
