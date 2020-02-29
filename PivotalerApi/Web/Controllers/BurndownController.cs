using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Data;
using Infrastructure.PivotalApi;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.Models;
using Web.Models.Agile;

namespace Web.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class BurndownController : ControllerBase
  {

    private readonly IBurndownApiCalls burndownApiCalls;
    private readonly IMapper mapper;
    private readonly PostgressDbContext dbContext;

    public BurndownController(IBurndownApiCalls burndownApiCalls, IMapper mapper, PostgressDbContext dbContext)
    {
      this.burndownApiCalls = burndownApiCalls;
      this.mapper = mapper;
      this.dbContext = dbContext;
    }

    [HttpGet]
    [Route("datapoint")]
    public async Task<IActionResult> GetDatapoint()
    {
      var startDate = new DateTime(2020, 02, 17);
      var endDate = new DateTime(2020, 03, 01);
      var result = burndownApiCalls.GetBurndown(startDate, endDate);
      return Ok(result);
    }
    
    [HttpGet]
    [Route("{iterationId}")]
    public async Task<IActionResult> GetBurndownById(int iterationId)
    {
      var iterationData = await dbContext.Iterations
        .Include(x => x.DataPoints)
        .SingleOrDefaultAsync(x => x.IterationId == iterationId);

      if(iterationData == null)
      {
        return NotFound();
      }

      return Ok(convertIterationDataToBurndownChartModel(mapper.Map<IterationModel>(iterationData)));
    }

    private BurndownChartModel convertIterationDataToBurndownChartModel(IterationModel data)
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
    
    private IEnumerable<Datapoint> makeIdealBurndown(int initialPoints, int days) {
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

    private IEnumerable<Datapoint> makePointBurndown(List<int?> points)
    {
      var datapoints = new List<Datapoint>();

      for(var i = 0; i < points.Count(); i++)
      {
        datapoints.Add(makeDatapoint((double)i, (double)points[i]));
      }


      return datapoints;
    }

    private Datapoint makeDatapoint(double x, double y)
    {
      return new Datapoint
      {
        X = x,
        Y = y
      };
    }

  }
}