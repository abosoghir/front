using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.AuthenticationManagement.RevokeRefreshToken;

public record RevokeRefreshTokenRequest() : IRequest<Result<object>>;
