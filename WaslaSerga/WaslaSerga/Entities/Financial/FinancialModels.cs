namespace WaslaSerga.Entities.Financial;

public class Wallet : WaslaSerga.Common.AuditableEntity
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public decimal Balance { get; set; }
    public decimal TotalDeposited { get; set; }
    public decimal TotalWithdrawn { get; set; }
    public WaslaSerga.Common.Enums.CurrencyType Currency { get; set; } = WaslaSerga.Common.Enums.CurrencyType.EGP;
    public bool IsActive { get; set; } = true;
    
    public WaslaSerga.Entities.Identity.ApplicationUser User { get; set; } = default!;
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}

public class Transaction : WaslaSerga.Common.AuditableEntity
{
    public int Id { get; set; }
    public int WalletId { get; set; }
    public decimal Amount { get; set; }
    public WaslaSerga.Common.Enums.TransactionType Type { get; set; }
    public WaslaSerga.Common.Enums.TransactionStatus Status { get; set; }
    public string? Description { get; set; }
    public decimal BalanceAfter { get; set; }
    
    public Wallet Wallet { get; set; } = default!;
}
