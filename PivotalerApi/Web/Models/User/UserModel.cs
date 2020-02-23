namespace Web.Models.User
{
  public class UserModel {
    public string UserId { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public int PivotalUserId { get; set; }
    public string PivotalApiKey { get; set; }
    public string PivotalUserInitials { get; set; }
  }
}