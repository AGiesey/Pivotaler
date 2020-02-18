using System.Threading.Tasks;
using Infrastructure.PivotalApi;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class BurndownController : ControllerBase
  {

    private readonly StoryApiCalls storyApiCalls;
    public BurndownController()
    {
      storyApiCalls = new StoryApiCalls();
    }
  }
}