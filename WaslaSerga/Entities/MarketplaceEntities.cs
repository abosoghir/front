using WaslaSerga.Common;
using WaslaSerga.Common.Enums;

namespace WaslaSerga.Entities;

public class Task : AuditableEntity
{
    public int Id { get; set; }
    public int SeekerId { get; set; }
    public int? HelperId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public TaskCategory Category { get; set; }
    public Common.Enums.TaskStatus Status { get; set; } = Common.Enums.TaskStatus.Open;
    public decimal? Budget { get; set; }
    public DateTime? Deadline { get; set; }
    public DateTime? CompletedAt { get; set; }
    
    public Seeker Seeker { get; set; } = default!;
    public Helper? Helper { get; set; }
    public ICollection<TaskOffer> Offers { get; set; } = new List<TaskOffer>();
}

public class TaskOffer : AuditableEntity
{
    public int Id { get; set; }
    public int TaskId { get; set; }
    public int HelperId { get; set; }
    public string? Message { get; set; }
    public decimal ProposedPrice { get; set; }
    public int ProposedDurationDays { get; set; }
    public TaskOfferStatus Status { get; set; } = TaskOfferStatus.Pending;
    
    public Entities.Task Task { get; set; } = default!;
    public Helper Helper { get; set; } = default!;
}

public class Message : AuditableEntity
{
    public int Id { get; set; }
    public string SenderId { get; set; } = string.Empty;
    public string ReceiverId { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public MessageType Type { get; set; } = MessageType.Text;
    public bool IsRead { get; set; } = false;
    public int? TaskId { get; set; }
    public int? ProjectId { get; set; }
    public int? SessionId { get; set; }
}

public class Session : AuditableEntity
{
    public int Id { get; set; }
    public int HelperId { get; set; }
    public string SeekerId { get; set; } = string.Empty;
    public DateTime ScheduledAt { get; set; }
    public int DurationMinutes { get; set; }
    public decimal TotalPrice { get; set; }
    public SessionStatus Status { get; set; } = SessionStatus.Pending;
    public string? MeetingLink { get; set; }
    public string? MeetingPlatform { get; set; }
    public bool IsFreeSession { get; set; } = false;
    public string? Notes { get; set; }
}

public class Project : AuditableEntity
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Budget { get; set; }
    public int DurationDays { get; set; }
    public ProjectCategory Category { get; set; }
    public ProjectStatus Status { get; set; } = ProjectStatus.Open;
}

public class Review : AuditableEntity
{
    public int Id { get; set; }
    public string ReviewerId { get; set; } = string.Empty;
    public string RevieweeId { get; set; } = string.Empty;
    public ReviewType Type { get; set; }
    public int RelatedEntityId { get; set; }
    public string RelatedEntityType { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;
    public int QualityRating { get; set; }
    public int CommunicationRating { get; set; }
    public int TimelinessRating { get; set; }
    public int ValueRating { get; set; }
}

public class Wallet : AuditableEntity
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public decimal Balance { get; set; }
    public decimal TotalDeposited { get; set; }
    public decimal TotalWithdrawn { get; set; }
    public CurrencyType Currency { get; set; } = CurrencyType.EGP;
    public bool IsActive { get; set; } = true;
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}

public class Transaction : AuditableEntity
{
    public int Id { get; set; }
    public int WalletId { get; set; }
    public decimal Amount { get; set; }
    public TransactionType Type { get; set; }
    public TransactionStatus Status { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal BalanceAfter { get; set; }
    public Wallet Wallet { get; set; } = default!;
}

public class Notification : AuditableEntity
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public NotificationType Type { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public string? ActionUrl { get; set; }
    public bool IsRead { get; set; } = false;
}
