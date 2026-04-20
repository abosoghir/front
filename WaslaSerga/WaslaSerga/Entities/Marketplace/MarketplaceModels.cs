namespace WaslaSerga.Entities.Marketplace;

public class Task : WaslaSerga.Common.AuditableEntity
{
    public int Id { get; set; }
    public int SeekerId { get; set; }
    public int? HelperId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public WaslaSerga.Common.Enums.TaskCategory Category { get; set; }
    public WaslaSerga.Common.Enums.TaskStatus Status { get; set; } = WaslaSerga.Common.Enums.TaskStatus.Open;
    public decimal? Budget { get; set; }
    public DateTime? Deadline { get; set; }
    public DateTime? CompletedAt { get; set; }
    
    public WaslaSerga.Entities.Identity.Seeker Seeker { get; set; } = default!;
    public WaslaSerga.Entities.Identity.Helper? Helper { get; set; }
    public ICollection<TaskOffer> Offers { get; set; } = new List<TaskOffer>();
}

public class TaskOffer : WaslaSerga.Common.AuditableEntity
{
    public int Id { get; set; }
    public int TaskId { get; set; }
    public int HelperId { get; set; }
    public string? Message { get; set; }
    public decimal ProposedPrice { get; set; }
    public int ProposedDurationDays { get; set; }
    public WaslaSerga.Common.Enums.TaskOfferStatus Status { get; set; } = WaslaSerga.Common.Enums.TaskOfferStatus.Pending;
    
    public Task Task { get; set; } = default!;
    public WaslaSerga.Entities.Identity.Helper Helper { get; set; } = default!;
}

public class Project : WaslaSerga.Common.AuditableEntity
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Budget { get; set; }
    public int DurationDays { get; set; }
    public WaslaSerga.Common.Enums.ProjectCategory Category { get; set; }
    public WaslaSerga.Common.Enums.ProjectStatus Status { get; set; } = WaslaSerga.Common.Enums.ProjectStatus.Open;
}
