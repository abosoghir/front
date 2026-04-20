using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WaslaSerga.Entities;

namespace WaslaSerga.Persistence;

public class WaslaSergaDbContext : IdentityDbContext<ApplicationUser>
{
    public WaslaSergaDbContext(DbContextOptions<WaslaSergaDbContext> options)
        : base(options)
    {
    }

    public DbSet<Helper> Helpers => Set<Helper>();
    public DbSet<Seeker> Seekers => Set<Seeker>();
    public DbSet<Entities.Task> Tasks => Set<Entities.Task>();
    public DbSet<TaskOffer> TaskOffers => Set<TaskOffer>();
    public DbSet<HelperSkill> HelperSkills => Set<HelperSkill>();
    public DbSet<HelperService> HelperServices => Set<HelperService>();
    public DbSet<HelperProject> HelperProjects => Set<HelperProject>();
    public DbSet<Message> Messages => Set<Message>();
    public DbSet<Session> Sessions => Set<Session>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<Wallet> Wallets => Set<Wallet>();
    public DbSet<Transaction> Transactions => Set<Transaction>();
    public DbSet<Notification> Notifications => Set<Notification>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ApplicationUser>()
            .HasOne(u => u.HelperProfile)
            .WithOne(h => h.User)
            .HasForeignKey<Helper>(h => h.UserId);

        builder.Entity<ApplicationUser>()
            .HasOne(u => u.SeekerProfile)
            .WithOne(s => s.User)
            .HasForeignKey<Seeker>(s => s.UserId);

        builder.Entity<Entities.Task>()
            .HasOne(t => t.Seeker)
            .WithMany(s => s.Tasks)
            .HasForeignKey(t => t.SeekerId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Entities.Task>()
            .HasOne(t => t.Helper)
            .WithMany()
            .HasForeignKey(t => t.HelperId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<TaskOffer>()
            .HasOne(to => to.Task)
            .WithMany(t => t.Offers)
            .HasForeignKey(to => to.TaskId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<TaskOffer>()
            .HasOne(to => to.Helper)
            .WithMany()
            .HasForeignKey(to => to.HelperId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Transaction>()
            .HasOne(t => t.Wallet)
            .WithMany(w => w.Transactions)
            .HasForeignKey(t => t.WalletId);
    }
}
