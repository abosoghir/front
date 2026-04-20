namespace WaslaSerga.Entities.Reviews;

public class Review : WaslaSerga.Common.AuditableEntity
{
    public int Id { get; set; }
    public string ReviewerId { get; set; } = string.Empty;
    public string RevieweeId { get; set; } = string.Empty;
    public WaslaSerga.Common.Enums.ReviewType Type { get; set; }
    public int RelatedEntityId { get; set; }
    public string RelatedEntityType { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string? Comment { get; set; }
    public int QualityRating { get; set; }
    public int CommunicationRating { get; set; }
    public int TimelinessRating { get; set; }
    public int ValueRating { get; set; }
    
    public WaslaSerga.Entities.Identity.ApplicationUser Reviewer { get; set; } = default!;
    public WaslaSerga.Entities.Identity.ApplicationUser Reviewee { get; set; } = default!;
}
