using System;
using System.Threading.Tasks;
using AutoMapper;
using Data;
using Infrastructure.Models;
using Infrastructure.PivotalApi;
using Infrastructure.Burndown;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Web.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class BurndownController : ControllerBase
  {
    private readonly IBurndownApiCalls burndownApiCalls;
    private readonly IMapper mapper;
    private readonly PostgressDbContext dbContext;
    private readonly DatapointService datapointService;

    public BurndownController(
      IBurndownApiCalls burndownApiCalls,
      IMapper mapper,
      PostgressDbContext dbContext)
    {
      this.burndownApiCalls = burndownApiCalls;
      this.mapper = mapper;
      this.dbContext = dbContext;
      //TODO: Inject or make static
      this.datapointService = new DatapointService();
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

      return Ok(datapointService.convertIterationDataToBurndownChartModel(mapper.Map<IterationModel>(iterationData)));
    }
  }
}