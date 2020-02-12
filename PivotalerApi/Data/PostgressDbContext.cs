using Data.Entities.Identity;
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

  }
}