using System;
using System.Threading.Tasks;
using Data;
using Data.Entities.Identity;
using Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{

  [ApiController]
  [Route("[controller]")]
  public class LoginController : ControllerBase
  {
    private readonly UserManager<User> userManager;

    public LoginController(UserManager<User> userManager)
    {
      this.userManager = userManager;
    }

    [HttpPost]
    public IActionResult Login()
    {
      return Ok("Logged In");
    }

    [HttpPost("/Register")]
    public async Task<IActionResult> Register(User user)
    {
      
      user.Id = Guid.NewGuid().ToString();
      await userManager.CreateAsync(user, user.PasswordHash);
      return Ok();
    }
    
  }
}