using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WaslaSerga.Entities.Communication;
using WaslaSerga.Entities.Financial;
using WaslaSerga.Entities.HelperProfile;
using WaslaSerga.Entities.Identity;
using WaslaSerga.Entities.Marketplace;
using WaslaSerga.Entities.Notifications;
using WaslaSerga.Entities.Reviews;

namespace WaslaSerga.Persistence;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Helper> Helpers { get; set; }
    public DbSet<Seeker> Seekers { get; set; }
    public DbSet<HelperSkill> HelperSkills { get; set; }
    public DbSet<HelperService> HelperServices { get; set; }
    public DbSet<HelperProject> HelperProjects { get; set; }
    public DbSet<Entities.Marketplace.Task> Tasks { get; set; }
    public DbSet<TaskOffer> TaskOffers { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Session> Sessions { get; set; }
    public DbSet<Wallet> Wallets { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Notification> Notifications { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Required configuration for complex relations
        builder.Entity<Message>()
            .HasOne(m => m.Sender)
            .WithMany()
            .HasForeignKey(m => m.SenderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Message>()
            .HasOne(m => m.Receiver)
            .WithMany()
            .HasForeignKey(m => m.ReceiverId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Review>()
            .HasOne(r => r.Reviewer)
            .WithMany()
            .HasForeignKey(r => r.ReviewerId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Review>()
            .HasOne(r => r.Reviewee)
            .WithMany()
            .HasForeignKey(r => r.RevieweeId)
            .OnDelete(DeleteBehavior.Restrict);
            
        builder.Entity<Session>()
            .HasOne(s => s.SeekerUser)
            .WithMany()
            .HasForeignKey(s => s.SeekerId)
            .OnDelete(DeleteBehavior.Restrict);
            
        builder.Entity<TaskOffer>()
            .HasOne(to => to.Task)
            .WithMany(t => t.Offers)
            .HasForeignKey(to => to.TaskId)
            .OnDelete(DeleteBehavior.Restrict);
            
        builder.Entity<Entities.Marketplace.Task>()
            .HasOne(t => t.Seeker)
            .WithMany(s => s.Tasks)
            .HasForeignKey(t => t.SeekerId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
