

using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Identity
{
  [ApiController]
  [Route("[controller]")]
  public class LoginController : ControllerBase
  {
    public IActionResult Get() 
    {
      return Ok("Hello World");
    }
  }
}