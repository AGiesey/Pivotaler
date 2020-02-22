using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Data.Entities.Identity;
using Microsoft.AspNetCore.Authentication;
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

    [HttpPost("/Login")]
    public async Task<IActionResult> Login(LoginModel model)
    {
      if(ModelState.IsValid)
      {
        var user = await userManager.FindByEmailAsync(model.Email);

        if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
        {
            var identity = new ClaimsIdentity("cookies");
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.UserId));
            identity.AddClaim(new Claim(ClaimTypes.Name, user.UserName));

            await HttpContext.SignInAsync("cookies", new ClaimsPrincipal(identity));

            return Ok();
        }

        ModelState.AddModelError("", "Invalid UserName or Password");
      }

      return BadRequest();
    }

    [HttpPost("/Register")]
    public async Task<IActionResult> Register(RegisterUserModel userModel)
    {
      // TODO: Use AutoMapper instead.
      var newUser = new User
      {
        UserId = Guid.NewGuid().ToString(),
        UserName = userModel.UserName,
        Email = userModel.Email,
      };
      
      await userManager.CreateAsync(newUser, userModel.Password);

      // TODO: Use URI creator or whatever
      return Created($"/api/users/{newUser.UserId}", new {});
    }
    
  }
}