using Data.Models.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace Data 
{
  public class PostgressDbContext : IdentityDbContext<ApplicationUser>
  {
    public PostgressDbContext(DbContextOptions<PostgressDbContext> options)
      :base(options)
    {
    }

    // public DbSet<UserModel> Users { get; set; }
    // public DbSet<ApplicationUser> AspNetUsers {get; set;}

  }
}