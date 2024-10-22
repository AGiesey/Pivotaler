

using System.ComponentModel.DataAnnotations;
using Data.Entities.Pivotal;

namespace Data.Entities.Identity
{
  public class User 
  {
    [Key]
    public string UserId { get; set; }
    public string UserName { get; set; }
    public string NormalizedUserName { get; set; }
    public string PasswordHash { get; set; }
    public string Email { get; set; }
    public string NormalizedEmail { get; set; }
    public bool EmailConfirmed { get; set; }
    public PivotalUser PivotalUser { get; set; }
  }
}