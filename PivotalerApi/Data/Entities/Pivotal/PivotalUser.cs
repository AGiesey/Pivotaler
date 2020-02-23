using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Data.Entities.Identity;

namespace Data.Entities.Pivotal
{
  public class PivotalUser
  {
    [Key]
    [ForeignKey("User")]
    public string UserId { get; set; }
    public int? PivotalUserId { get; set; }
    public string PivotalApiKey { get; set; }
    public string PivotalUserInitials {get; set; }
    [JsonIgnore]
    public User User { get; set; }
  }
}