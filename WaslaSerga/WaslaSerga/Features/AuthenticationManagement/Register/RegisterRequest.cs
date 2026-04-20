using MediatR;
using WaslaSerga.Common;

namespace WaslaSerga.Features.AuthenticationManagement.Register;

public record RegisterRequest(
    string Name,
    string Email,
    string PhoneNumber,
    string Password,
    string Role
) : IRequest<Result<RegisterResponse>>;

public record RegisterResponse(
    string Id,
    string Email,
    string Name
);
