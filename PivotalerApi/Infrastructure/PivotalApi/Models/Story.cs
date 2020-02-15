

using System;
using System.Collections.Generic;

namespace Infrastructure.PivotalApi.Models
{
  public class Story
  {
    public int Id { get; set; }
    public int Project_Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Story_Type { get; set; }
    public string Current_State { get; set; }
    public float Estimate { get; set; }
    public DateTime Accepted_At { get; set; }
    public DateTime Deadline { get; set; }
    public DateTime ProjectedCompletion { get; set; }
    // public float Points_Accepted { get; set;} // Excluded by default, to include use "fields" paramater
    public float Points_Total { get; set; }
    public int Counts_Accepted { get; set; }
    public int Counts_Total { get; set; }
    public int Requested_By_Id { get; set; }
    public IEnumerable<int> Owner_Ids { get; set; }
    //public IEnumerable<int> Labels { get; set; } // This and Label_Ids throw a deserialization error
    public IEnumerable<int> Task_Ids { get; set; }
    public IEnumerable<int> Pull_Request_Ids { get; set; }
    public IEnumerable<int>  Branch_Ids { get; set; }
    public IEnumerable<int> Blocker_Ids { get; set; }
    public IEnumerable<int> Follower_Ids { get; set; }
    public IEnumerable<int> Comment_Ids { get; set; }
    public DateTime Created_At { get; set; }
    public DateTime Updated_At { get; set; }
    public int Integration_Id { get; set; }
    public int Before_Id { get; set; }
    public int After_Id { get; set; }
    public string Url { get; set; }
    //public [story_transition] Transitions { get; set; } // What is a story transition?
    public IEnumerable<int> Blocked_Story_Ids { get; set; }
    public IEnumerable<int> Review_Ids { get; set; }
    //public [cycle_time_details]] Cycle_Time_Details { get; set; } // What is a cycle time detail?
    public string Kind { get; set; }
  }
}