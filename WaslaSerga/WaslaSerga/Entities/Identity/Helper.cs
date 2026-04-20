namespace WaslaSerga.Entities.Identity;

public class Helper : WaslaSerga.Common.AuditableEntity
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
    public ICollection<WaslaSerga.Entities.HelperProfile.HelperSkill> HelperSkills { get; set; } = new List<WaslaSerga.Entities.HelperProfile.HelperSkill>();
    public ICollection<WaslaSerga.Entities.HelperProfile.HelperService> HelperServices { get; set; } = new List<WaslaSerga.Entities.HelperProfile.HelperService>();
    public ICollection<WaslaSerga.Entities.HelperProfile.HelperProject> HelperProjects { get; set; } = new List<WaslaSerga.Entities.HelperProfile.HelperProject>();
}
