

using System.ComponentModel.DataAnnotations;

namespace Data.Entities.Identity
{
  public class User 
  {
    [Key]
    public string Id { get; set; }
    public string UserName { get; set; }
    public string NormalizedUserName { get; set; }
    public string PasswordHash { get; set; }
  }
}