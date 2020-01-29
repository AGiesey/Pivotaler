using System.ComponentModel.DataAnnotations;

namespace Data.User 
{
 
  public class UserModel
  {
    [Key]
    public int Id { get; set; }
    public string GivenName { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public int PivotalId { get; set; }
  }
}