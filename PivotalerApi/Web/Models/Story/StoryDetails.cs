using System;
using System.Collections.Generic;

namespace Web.Models.Story
{
  public class StoryDetails 
  {
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string StoryType { get; set; }
    public string CurrentState { get; set; }
    public float Estimate { get; set; }
    public DateTime AcceptedAt { get; set; }
    public IEnumerable<int> OwnerIds { get; set; }
    public IEnumerable<int> TaskIds { get; set; }
    public IEnumerable<int> BlockerIds { get; set; }
    public IEnumerable<int> CommentIds { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string Url { get; set; }
    public IEnumerable<int> BlockedStoryIds { get; set; }
    public string Kind { get; set; }
  }
}