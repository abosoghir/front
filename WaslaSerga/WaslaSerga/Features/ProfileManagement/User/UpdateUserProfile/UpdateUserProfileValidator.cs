using FluentValidation;

namespace WaslaSerga.Features.ProfileManagement.User.UpdateUserProfile;

public class UpdateUserProfileValidator : AbstractValidator<UpdateUserProfileRequest>
{
    public UpdateUserProfileValidator()
    {
        RuleFor(x => x.Name).NotEmpty().Length(3, 100);
        
        RuleFor(x => x.WebsiteUrl)
            .MaximumLength(500)
            .Matches(@"^(https?://)?([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?$")
            .When(x => !string.IsNullOrEmpty(x.WebsiteUrl))
            .WithMessage("Invalid URL format");
            
        RuleFor(x => x.LinkedInUrl)
            .MaximumLength(500)
            .Matches(@"^(https?://)?(www\.)?linkedin\.com/.*$")
            .When(x => !string.IsNullOrEmpty(x.LinkedInUrl))
            .WithMessage("Invalid LinkedIn URL format");
            
        RuleFor(x => x.GithubUrl)
            .MaximumLength(500)
            .Matches(@"^(https?://)?(www\.)?github\.com/.*$")
            .When(x => !string.IsNullOrEmpty(x.GithubUrl))
            .WithMessage("Invalid GitHub URL format");
    }
}
