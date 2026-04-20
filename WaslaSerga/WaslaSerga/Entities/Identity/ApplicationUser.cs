using Microsoft.AspNetCore.Identity;

namespace WaslaSerga.Entities.Identity;

public class ApplicationUser : IdentityUser
{
    public string Name { get; set; } = string.Empty;
    public string? ProfilePictureUrl { get; set; }
    public string? Bio { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; }
    public string? WebsiteUrl { get; set; }
    public string? LinkedInUrl { get; set; }
    public string? GitHubUrl { get; set; }
    public string? CVUrl { get; set; }
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    
    public Helper? HelperProfile { get; set; }
    public Seeker? SeekerProfile { get; set; }
}
