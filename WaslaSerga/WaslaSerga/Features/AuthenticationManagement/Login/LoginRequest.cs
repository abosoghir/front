using MediatR;
using WaslaSerga.Common;

namespace WaslaSerga.Features.AuthenticationManagement.Login;

public record LoginRequest(string Email, string Password) : IRequest<Result<LoginResponse>>;

public record LoginResponse(
    string Id,
    string Email,
    string Name,
    string PhoneNumber,
    List<string> Roles,
    string Token,
    int ExpirseIn,
    string RefreshToken,
    DateTime RefreshTokenExpiration
);
