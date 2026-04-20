namespace WaslaSerga.Entities.Notifications;

public class Notification : WaslaSerga.Common.AuditableEntity
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public WaslaSerga.Common.Enums.NotificationType Type { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public string? ActionUrl { get; set; }
    public bool IsRead { get; set; } = false;
    
    public WaslaSerga.Entities.Identity.ApplicationUser User { get; set; } = default!;
}
