using System;
using System.Collections.Generic;
using System.Linq;
using Infrastructure.Models;

namespace Infrastructure.Burndown
{
  //TODO: Should be static?
  public class DatapointService
  {

    public BurndownChartModel convertIterationDataToBurndownChartModel(IterationModel data)
    {
      const int daysInIteration = 14;
      var points = data.DataPoints.Select(x => x.RemainingPoints).ToList();
      var everhour = data.DataPoints.Select(x => x.RemainingEverhourPoints).ToList();

      var chartModel = new BurndownChartModel 
      {
        IdealBurndown = makeIdealBurndown(data.InitialPoints, daysInIteration),
        PointBurndown = makePointBurndown(points),
        //EverhourBurndown = new // makePointBurndown(everhour)
      };
      return chartModel;
    }
    
    public IEnumerable<Datapoint> makeIdealBurndown(int initialPoints, int days) {
      var datapoints = new List<Datapoint>();
      var stepValue = (double)initialPoints / days;
      var remainingPoints = (double)initialPoints;

      for(var i = 0; i <= days; i++)
      {
        datapoints.Add(makeDatapoint((double)i, remainingPoints));
        remainingPoints = remainingPoints - stepValue;
      }

      return datapoints;
    }

    public IEnumerable<Datapoint> makePointBurndown(List<int?> points)
    {
      var datapoints = new List<Datapoint>();

      for(var i = 0; i < points.Count(); i++)
      {
        datapoints.Add(makeDatapoint((double)i, (double)points[i]));
      }


      return datapoints;
    }

    public Datapoint makeDatapoint(double x, double y)
    {
      return new Datapoint
      {
        X = x,
        Y = y
      };
    }
  }
}