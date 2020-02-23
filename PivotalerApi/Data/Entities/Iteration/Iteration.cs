using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.Entities.Iteration
{
  public class Iteration
  {
    [Key]
    public int IterationId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public int InitialPoints { get; set; }

    public IEnumerable<IterationDataPoint> DataPoints { get; set; }

  }
}