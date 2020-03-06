using System.Collections.Generic;

namespace Infrastructure.Models
{
  public class BurndownChartModel
  {
    public IEnumerable<Datapoint> IdealBurndown { get; set; }
    public IEnumerable<Datapoint> IdealEverhourBurndown { get; set; }
    public IEnumerable<Datapoint> PointBurndown { get; set; }
    public IEnumerable<Datapoint> EverhourBurndown { get; set; }
  }

  public class Datapoint
  {
    public double X { get; set; }
    public double Y { get; set; }
  }
}