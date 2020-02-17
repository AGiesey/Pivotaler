using System.Collections.Generic;

namespace Web.Models.Story
{
  public class StorySummary
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string StoryType { get; set; }
    public float Estimate { get; set; }
    public string CurrentState { get; set; }
    public IEnumerable<int> OwnerIds { get; set; }
  }
}