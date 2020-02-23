using System;
using System.Collections.Generic;
using Data.Entities.Agile;

namespace Web.Models.Agile
{
  public class IterationModel
  {
    public int IterationId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int InitialPoints { get; set; }
    // public IEnumerable<IterationDataPoint> DataPoints { get; set; }
  }
}