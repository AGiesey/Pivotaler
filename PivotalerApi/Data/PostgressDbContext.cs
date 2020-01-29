using Data.User;
using Microsoft.EntityFrameworkCore;
namespace Data 
{
  public class PostgressDbContext : DbContext
  {
    public PostgressDbContext(DbContextOptions<PostgressDbContext> options)
      :base(options)
    {
    }

    public DbSet<UserModel> Users { get; set; }

  }
}