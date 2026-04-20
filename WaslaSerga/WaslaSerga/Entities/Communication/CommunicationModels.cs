namespace WaslaSerga.Entities.Communication;

public class Message : WaslaSerga.Common.AuditableEntity
{
    public int Id { get; set; }
    public string SenderId { get; set; } = string.Empty;
    public string ReceiverId { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public WaslaSerga.Common.Enums.MessageType Type { get; set; } = WaslaSerga.Common.Enums.MessageType.Text;
    public bool IsRead { get; set; } = false;
    public int? TaskId { get; set; }
    public int? ProjectId { get; set; }
    public int? SessionId { get; set; }
    
    public WaslaSerga.Entities.Identity.ApplicationUser Sender { get; set; } = default!;
    public WaslaSerga.Entities.Identity.ApplicationUser Receiver { get; set; } = default!;
}

public class Session : WaslaSerga.Common.AuditableEntity
{
    public int Id { get; set; }
    public int HelperId { get; set; }
    public string SeekerId { get; set; } = string.Empty;
    public DateTime ScheduledAt { get; set; }
    public int DurationMinutes { get; set; }
    public decimal TotalPrice { get; set; }
    public WaslaSerga.Common.Enums.SessionStatus Status { get; set; } = WaslaSerga.Common.Enums.SessionStatus.Pending;
    public string? MeetingLink { get; set; }
    public string? MeetingPlatform { get; set; }
    public bool IsFreeSession { get; set; } = false;
    public string? Notes { get; set; }
    
    public WaslaSerga.Entities.Identity.Helper Helper { get; set; } = default!;
    public WaslaSerga.Entities.Identity.ApplicationUser SeekerUser { get; set; } = default!;
}
