using System;
using System.Threading.Tasks;
using AutoMapper;
using Data;
using Data.Entities.Agile;
using Microsoft.AspNetCore.Mvc;
using Web.Models.Agile;

namespace Web.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class IterationController : ControllerBase
  {
    private readonly PostgressDbContext dbContext;
    private readonly IMapper mapper;

    public IterationController(PostgressDbContext postgressDbContext, IMapper mapper)
    {
      this.dbContext = postgressDbContext;
      this.mapper = mapper;
    }

    [HttpGet]
    [Route("{iterationId}")]
    public Task<IActionResult> GetIteration(int iterationId)
    {
      throw new NotImplementedException();
    }

    [HttpPost]
    public async Task<IActionResult> CreateIteration(IterationModel model)
    {
        // TODO: Why  doesn't the mapper work?
        // var entity = Mapper.Map<Iteration>(model);
        var entity = new Iteration {
          StartDate = model.StartDate,
          EndDate = model.EndDate,
          InitialPoints = model.InitialPoints
        };

        await dbContext.AddAsync(entity);
        await dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpPut]
    [Route("{iterationId}")]
    public Task<IActionResult> UpdateIteration(int iterationId, IterationModel model)
    {
      throw new NotImplementedException();
    }

    [HttpGet]
    [Route("{iterationId}/datapoints")]
    public Task<IActionResult> GetIterationDataPoints(int iterationId)
    {
      throw new NotImplementedException();
    }

    [HttpPost]
    [Route("{iterationId}/datapoints")]
    public async Task<IActionResult> CreateIterationDataPoint(int iterationId, IterationDataPointModel model )
    {
      var entity = new IterationDataPoint {
        DateTime = model.DateTime,
        IterationId = iterationId,
        RemainingPoints = model.RemainingPoints
      };

      var result = await dbContext.AddAsync(entity);
      await dbContext.SaveChangesAsync();

      return Ok();
    }

    [HttpPut]
    [Route("datapoint/{datapointId}")]
    public Task<IActionResult> UpdateDataPoint(int datapointId, IterationDataPointModel model)
    {
      throw new NotImplementedException();
    }
  }
}