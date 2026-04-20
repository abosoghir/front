using MediatR;
using WaslaSerga.Common;

namespace WaslaSerga.Features.AuthenticationManagement.ChangePassword;

public record ChangePasswordRequest(string CurrentPassword, string NewPassword) : IRequest<Result>;
