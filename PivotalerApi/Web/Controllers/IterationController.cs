using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Data;
using Data.Entities.Agile;
using Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.Models;
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

    [HttpGet]
    [Route("recent")]
    public async Task<IActionResult> GetRecentIterations(int count)
    {
      var today = DateTime.Now;

      var result = await dbContext.Iterations
        .ToListAsync();

      return Ok(mapper.Map<IEnumerable<Iteration>, IEnumerable<IterationModel>>(result));
    }

    [HttpGet]
    [Route("current")]
    public async Task<IActionResult> GetCurrentIteration()
    {
      var today = DateTime.Now;
      var result = await dbContext.Iterations
        .Include(x => x.DataPoints)
        .SingleOrDefaultAsync(x => x.StartDate < today && x.EndDate >= today);

      if (result != null)
      {
        return Ok(mapper.Map<IterationModel>(result));
      }

      // Maybe not found is incorrect in this case.
      return NotFound();
    }

    [HttpPost]
    [Route("new")]
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
    public async Task<IActionResult> UpdateIteration(int iterationId, EditIterationModel model)
    {
      var existingIteration = await dbContext.Iterations
        .SingleOrDefaultAsync(x => x.IterationId == iterationId);

      if (existingIteration != null)
      {
        mapper.Map<EditIterationModel, Iteration>(model, existingIteration);
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

    [HttpGet]
    [Route("datapoints/{datapointId}")]
    public async Task<IActionResult> GetDatapointById(int datapointId)
    {
      var result = await dbContext.IterationDataPoints
        .SingleOrDefaultAsync(x => x.IterationDataPointId == datapointId);

      if (result != null) {
        return Ok(mapper.Map<IterationDataPointModel>(result));
      }

      return NotFound();
    }

    [HttpPost]
    [Route("{iterationId}/datapoints/new")]
    public async Task<IActionResult> CreateIterationDataPoint(int iterationId, IterationDataPointModel model )
    {
      var result = await dbContext.AddAsync(mapper.Map<IterationDataPoint>(model));
      await dbContext.SaveChangesAsync();

      return Ok();
    }

    [HttpPut]
    [Route("datapoints/{datapointId}")]
    public async Task<IActionResult> UpdateDatapoint(int datapointId, EditDatapointModel model)
    {
      var existingDataPoint = await dbContext.IterationDataPoints
        .SingleOrDefaultAsync(x => x.IterationDataPointId == datapointId);

      if (existingDataPoint != null)
      {
        mapper.Map<EditDatapointModel, IterationDataPoint>(model, existingDataPoint);
        await dbContext.SaveChangesAsync();
        return Ok(mapper.Map<IterationDataPointModel>(existingDataPoint));
      }

      return BadRequest();
    }
  }
}