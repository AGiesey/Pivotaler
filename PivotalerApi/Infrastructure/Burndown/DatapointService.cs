using System;
using System.Collections.Generic;
using System.Linq;
using Infrastructure.Models;

namespace Infrastructure.Burndown
{
  //TODO: Should be static?
  public static class DatapointService
  {

    public static BurndownChartModel ConvertIterationDataToBurndownChartModel(IterationModel data)
    {
      const int daysInIteration = 14;
      var points = data.DataPoints.Select(x => x.RemainingPoints).ToList();
      var everhour = data.DataPoints.Select(x => x.RemainingEverhourPoints).ToList();

      var chartModel = new BurndownChartModel 
      {
        IdealBurndown = MakeIdealBurndown(data.InitialPoints, daysInIteration),
        PointBurndown = MakePointBurndown(points),
        EverhourBurndown = MakePointBurndown(everhour)
      };
      return chartModel;
    }
    
    public static IEnumerable<Datapoint> MakeIdealBurndown(int initialPoints, int days) {
      var datapoints = new List<Datapoint>();
      var stepValue = (double)initialPoints / days;
      var remainingPoints = (double)initialPoints;

      for(var i = 0; i <= days; i++)
      {
        datapoints.Add(MakeDatapoint((double)i, remainingPoints));
        remainingPoints = remainingPoints - stepValue;
      }

      return datapoints;
    }

    public static IEnumerable<Datapoint> MakePointBurndown(List<int?> points)
    {
      var datapoints = new List<Datapoint>();

      for(var i = 0; i < points.Count(); i++)
      {
        if (points[i] != null)
        {
          datapoints.Add(MakeDatapoint((double)i, (double)points[i]));
        }
      }


      return datapoints;
    }

    public static Datapoint MakeDatapoint(double x, double y)
    {
      return new Datapoint
      {
        X = x,
        Y = y
      };
    }
  }
}