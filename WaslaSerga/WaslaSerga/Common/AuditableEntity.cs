namespace WaslaSerga.Common;

public abstract class AuditableEntity
{
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedOn { get; set; }
}
