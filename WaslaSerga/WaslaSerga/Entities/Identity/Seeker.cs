namespace WaslaSerga.Entities.Identity;

public class Seeker : WaslaSerga.Common.AuditableEntity
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public ApplicationUser User { get; set; } = default!;
    public ICollection<Marketplace.Task> Tasks { get; set; } = new List<Marketplace.Task>();
    public ICollection<Communication.Session> Sessions { get; set; } = new List<Communication.Session>();
}
