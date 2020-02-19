using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Infrastructure.PivotalApi;
using Microsoft.AspNetCore.Mvc;
using Web.Models.Story;

namespace Web.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class SearchController : ControllerBase
  {
    private readonly IMapper _mapper;
    private readonly StoryApiCalls storyApiCalls;

    public SearchController(IMapper mapper)
    {
      _mapper = mapper;
      storyApiCalls = new StoryApiCalls(); // TODO: use DI
    }

    [HttpGet("SwimLane")]
    public async Task<IActionResult> GetSwimLane(string userSearchId)
    {
      var result = await storyApiCalls.Search(userSearchId);

      //TODO: Send the other stuff too
      var summaries = _mapper.Map<IEnumerable<StorySummary>>(result.Stories.Stories);

      return Ok(summaries);
    }
  }
}