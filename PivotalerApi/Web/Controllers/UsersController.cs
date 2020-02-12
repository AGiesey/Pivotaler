using Data.Entities.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Web.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class UsersController : ControllerBase
  {
    private readonly DbContext context;

    public UsersController(DbContext context)
    {
      this.context = context;
    }

    [HttpGet]
    public ActionResult<User> GetTestUser()
    {
      var newUser = new User {
        Id = "josos",
        UserName = "adam",
        NormalizedUserName = "ADAM",
        PasswordHash = "StuffAndThings"
      };

      return Ok(newUser);
    }

    [HttpPost]
    public ActionResult Create()
    {
      return Ok("Hello World");
    }
    
  }
}