using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.AuthenticationManagement.ChangePassword;

public record ChangePasswordRequest() : IRequest<Result<object>>;
