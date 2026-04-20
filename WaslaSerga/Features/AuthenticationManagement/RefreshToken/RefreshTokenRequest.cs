using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.AuthenticationManagement.RefreshToken;

public record RefreshTokenRequest() : IRequest<Result<object>>;
