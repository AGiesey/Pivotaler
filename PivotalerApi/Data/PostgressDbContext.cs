using Data.Entities.Identity;
using Data.Entities.Iteration;
using Data.Entities.Pivotal;
using Microsoft.EntityFrameworkCore;

namespace Data 
{
  public class PostgressDbContext : DbContext
  {
    public PostgressDbContext(DbContextOptions<PostgressDbContext> options)
      :base(options)
    {
    }
    public DbSet<User> Users { get; set;}
    public DbSet<PivotalUser> PivotalUsers { get; set; }
    public DbSet<Iteration> Iterations { get; set; }
    public DbSet<IterationDataPoint> IterationDataPoints { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<User>()
        .HasOne(e => e.PivotalUser)
        .WithOne(i => i.User)
        .HasForeignKey<PivotalUser>(i => i.UserId);

    }

  }
}