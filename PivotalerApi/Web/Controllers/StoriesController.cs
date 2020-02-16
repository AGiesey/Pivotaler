using System.Threading.Tasks;
using AutoMapper;
using Infrastructure.PivotalApi;
using Microsoft.AspNetCore.Mvc;
using Web.Models.Story;

namespace Web.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class StoriesController : ControllerBase
  {
    private readonly StoryApiCalls storyApiCalls;
    private readonly IMapper _mapper;
    public StoriesController(IMapper mapper)
    {
      storyApiCalls = new StoryApiCalls(); // TODO: use DI
      _mapper = mapper;
    }
    
    [HttpGet("{id}/Summary")]
    public async Task<IActionResult> GetStorySummaryById(int id)
    {
      var result = await storyApiCalls.GetStoryById(id);
      var summary = _mapper.Map<StorySummary>(result);

      return Ok(summary);
    }
  }
}