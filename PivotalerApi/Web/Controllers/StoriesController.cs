using System.Threading.Tasks;
using Infrastructure.PivotalApi;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class StoriesController : ControllerBase
  {
    private readonly StoryApiCalls storyApiCalls;
    public StoriesController()
    {
      storyApiCalls = new StoryApiCalls();
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetStoryById(int id)
    {
      var result = await storyApiCalls.GetStoryById(id);

      return Ok(result);
    }
  }
}