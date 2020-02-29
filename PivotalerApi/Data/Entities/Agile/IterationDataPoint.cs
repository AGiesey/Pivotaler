using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Data.Entities.Agile
{
  public class IterationDataPoint
  {
    [Key]
    public int IterationDataPointId { get; set; }

    public DateTime DateTime { get; set; }

    [ForeignKey("Iteration")]
    public int IterationId { get; set; }

    public int? RemainingPoints { get; set; }

    public int? RemainingEverhourPoints { get; set; }

    [JsonIgnore]
    public Iteration Iteration { get; set; }
  }
}