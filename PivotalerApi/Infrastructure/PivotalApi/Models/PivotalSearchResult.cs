namespace Infrastructure.PivotalApi.Models
{
  public class PivotalSearchResult
  {
    public string Query { get; set; }
    public PivotalSearchStoriesResult Stories { get; set; }
  }
}