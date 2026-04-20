namespace WaslaSerga.Entities.HelperProfile;

public class HelperSkill : WaslaSerga.Common.AuditableEntity
{
    public int Id { get; set; }
    public int HelperId { get; set; }
    public string SkillName { get; set; } = string.Empty;
    public Identity.Helper Helper { get; set; } = default!;
}

public class HelperService : WaslaSerga.Common.AuditableEntity
{
    public int Id { get; set; }
    public int HelperId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? DiscountPrice { get; set; }
    public int DeliveryDays { get; set; }
    public WaslaSerga.Common.Enums.ServiceCategory Category { get; set; }
    public Identity.Helper Helper { get; set; } = default!;
}

public class HelperProject : WaslaSerga.Common.AuditableEntity
{
    public int Id { get; set; }
    public int HelperId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ProjectImageUrl { get; set; }
    public string? RepositoryUrl { get; set; }
    public string? LiveDemoUrl { get; set; }
    public Identity.Helper Helper { get; set; } = default!;
}
