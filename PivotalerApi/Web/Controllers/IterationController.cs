using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Data;
using Data.Entities.Agile;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public async Task<IActionResult> GetIteration(int iterationId)
    {
      var result = await dbContext.Iterations
        .Include(x => x.DataPoints)
        .SingleOrDefaultAsync(x => x.IterationId == iterationId);

      if (result != null) 
      {
        return Ok(mapper.Map<IterationModel>(result));
      }

      return NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> CreateIteration(IterationModel model)
    {
        var entity = mapper.Map<Iteration>(model);

        await dbContext.AddAsync(entity);
        await dbContext.SaveChangesAsync();

        // TODO: Return 201 with location header
        return Ok();
    }

    [HttpPut]
    [Route("{iterationId}")]
    public async Task<IActionResult> UpdateIteration(int iterationId, IterationModel model)
    {
      var existingIteration = await dbContext.Iterations
        .SingleOrDefaultAsync(x => x.IterationId == iterationId);

      if (existingIteration != null)
      {
        mapper.Map<IterationModel, Iteration>(model, existingIteration);
        await dbContext.SaveChangesAsync();
        return Ok(mapper.Map<IterationModel>(existingIteration));
      }

      return BadRequest();
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
    public async Task<IActionResult> UpdateDataPoint(int datapointId, IterationDataPointModel model)
    {
      var existingDataPoint = await dbContext.IterationDataPoints
        .SingleOrDefaultAsync(x => x.IterationDataPointId == datapointId);

      if (existingDataPoint != null)
      {
        mapper.Map<IterationDataPointModel, IterationDataPoint>(model, existingDataPoint);
        await dbContext.SaveChangesAsync();
        return Ok(mapper.Map<IterationDataPointModel>(existingDataPoint));
      }

      return BadRequest();
    }
  }
}