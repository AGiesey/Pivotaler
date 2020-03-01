using System;
using System.Collections.Generic;
using Data.Entities.Agile;

namespace Infrastructure.Models
{
  public class IterationModel
  {
    public int IterationId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int InitialPoints { get; set; }
    public int? InitialEverhourPoints { get; set; }
    public IEnumerable<IterationDataPoint> DataPoints { get; set; }
  }
}