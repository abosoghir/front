using MediatR;
using Microsoft.AspNetCore.Identity;
using WaslaSerga.Common;
using WaslaSerga.Entities.Identity;
using WaslaSerga.Persistence;

namespace WaslaSerga.Features.AuthenticationManagement.Register;

public class RegisterHandler : IRequestHandler<RegisterRequest, Result<RegisterResponse>>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly AppDbContext _context;

    public RegisterHandler(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, AppDbContext context)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _context = context;
    }

    public async Task<Result<RegisterResponse>> Handle(RegisterRequest request, CancellationToken cancellationToken)
    {
        if (await _userManager.FindByEmailAsync(request.Email) != null)
        {
            return Result.Failure<RegisterResponse>(Error.Validation("Auth.EmailExists", "Email is already in use."));
        }

        var user = new ApplicationUser
        {
            UserName = request.Email,
            Email = request.Email,
            Name = request.Name,
            PhoneNumber = request.PhoneNumber
        };

        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            return Result.Failure<RegisterResponse>(Error.Validation("Auth.RegistrationFailed", errors));
        }

        if (!await _roleManager.RoleExistsAsync(request.Role))
        {
            await _roleManager.CreateAsync(new IdentityRole(request.Role));
        }

        await _userManager.AddToRoleAsync(user, request.Role);

        if (request.Role == "Seeker")
        {
            var seeker = new Seeker { UserId = user.Id, User = user };
            _context.Seekers.Add(seeker);
        }
        else if (request.Role == "Helper")
        {
            var helper = new Helper { UserId = user.Id, User = user, HourlyRate = 0 };
            _context.Helpers.Add(helper);
        }
        
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(new RegisterResponse(user.Id, user.Email, user.Name));
    }
}
