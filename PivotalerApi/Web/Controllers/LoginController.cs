using System;
using System.Threading.Tasks;
using Data.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Web.Models.User;

namespace Web.Controllers
{

  [ApiController]
  [Route("api/[controller]")]
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
    public async Task<IActionResult> Register(RegisterUserModel userModel)
    {
      // TODO: Use AutoMapper instead.
      var newUser = new User
      {
        Id = Guid.NewGuid().ToString(),
        UserName = userModel.UserName,
        Email = userModel.Email,
      };
      
      await userManager.CreateAsync(newUser, userModel.Password);

      // TODO: Use URI creator or whatever
      return Created($"/api/users/{newUser.Id}", new {});
    }
    
  }
}