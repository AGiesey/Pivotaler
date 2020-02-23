using System;
using System.Threading.Tasks;
using Infrastructure.PivotalApi;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class BurndownController : ControllerBase
  {

    private readonly IBurndownApiCalls burndownApiCalls;
    public BurndownController(IBurndownApiCalls burndownApiCalls)
    {
      this.burndownApiCalls = burndownApiCalls;
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
  }
}