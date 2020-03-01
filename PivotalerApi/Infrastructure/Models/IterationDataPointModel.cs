using System;

namespace Infrastructure.Models
{
  public class IterationDataPointModel
  {
    public int IterationDataPointId { get; set; }
    public DateTime DateTime { get; set; }
    public int? IterationId { get; set; }
    public int? RemainingPoints { get; set; }
    public int? RemainingEverhourPoints { get; set; }
  }
  
}