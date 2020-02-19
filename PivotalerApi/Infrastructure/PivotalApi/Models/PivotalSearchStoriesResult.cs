using System.Collections.Generic;

namespace Infrastructure.PivotalApi.Models
{
  public class PivotalSearchStoriesResult
  {
    public int Total_Hits { get; set; }
    public int Total_Hits_With_Done { get; set; }
    public int Total_Points { get; set; }
    public int Total_Points_Complete { get; set; }
    public IEnumerable<PivotalStory> Stories { get; set; }
  }
}