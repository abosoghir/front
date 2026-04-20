using Microsoft.AspNetCore.Identity;
using WaslaSerga.Common;

namespace WaslaSerga.Entities;

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

public class Helper : AuditableEntity
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string? Headline { get; set; }
    public string? Location { get; set; }
    public decimal HourlyRate { get; set; }
    public bool IsAvailable { get; set; } = true;
    public bool IsVerified { get; set; } = false;
    public double AverageRating { get; set; } = 0;
    public int TotalReviewsCount { get; set; } = 0;
    public int CompletedTasksCount { get; set; } = 0;
    public int CompletedProjectsCount { get; set; } = 0;
    public int CompletedSessionsCount { get; set; } = 0;
    public decimal TotalEarnings { get; set; } = 0;
    public int Points { get; set; } = 0;
    public double SpeedOfResponseInMinutes { get; set; } = 0;
    
    public ApplicationUser User { get; set; } = default!;
    public ICollection<HelperSkill> HelperSkills { get; set; } = new List<HelperSkill>();
    public ICollection<HelperService> HelperServices { get; set; } = new List<HelperService>();
    public ICollection<HelperProject> HelperProjects { get; set; } = new List<HelperProject>();
}

public class Seeker : AuditableEntity
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public ApplicationUser User { get; set; } = default!;
    
    public ICollection<Entities.Task> Tasks { get; set; } = new List<Entities.Task>();
    public ICollection<Session> Sessions { get; set; } = new List<Session>();
}

public class HelperSkill : AuditableEntity
{
    public int Id { get; set; }
    public int HelperId { get; set; }
    public string SkillName { get; set; } = string.Empty;
    public Helper Helper { get; set; } = default!;
}

public class HelperService : AuditableEntity
{
    public int Id { get; set; }
    public int HelperId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? DiscountPrice { get; set; }
    public int DeliveryDays { get; set; }
    public Common.Enums.ServiceCategory Category { get; set; }
    public Helper Helper { get; set; } = default!;
}

public class HelperProject : AuditableEntity
{
    public int Id { get; set; }
    public int HelperId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ProjectImageUrl { get; set; }
    public string? RepositoryUrl { get; set; }
    public string? LiveDemoUrl { get; set; }
    public Helper Helper { get; set; } = default!;
}
