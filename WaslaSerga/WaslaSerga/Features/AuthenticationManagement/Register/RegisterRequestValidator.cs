using FluentValidation;

namespace WaslaSerga.Features.AuthenticationManagement.Register;

public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
{
    public RegisterRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .Length(3, 100);

        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(200);

        RuleFor(x => x.PhoneNumber)
            .NotEmpty()
            .Matches("^(010|011|012|015)\\d{8}$")
            .WithMessage("Invalid Egyptian phone number");

        RuleFor(x => x.Password)
            .NotEmpty()
            .Matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$")
            .WithMessage("Password must be at least 6 characters with uppercase, lowercase, number and special character");

        RuleFor(x => x.Role)
            .NotEmpty()
            .Must(role => role == "Seeker" || role == "Helper")
            .WithMessage("Role must be either 'Seeker' or 'Helper'");
    }
}
