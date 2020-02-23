using System.Threading.Tasks;
using AutoMapper;
using Data;
using Data.Entities.Pivotal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.Models.User;

namespace Web.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class UserController : ControllerBase
  {
    private readonly IMapper mapper;
    private readonly PostgressDbContext dbContext;

    public UserController(IMapper mapper, PostgressDbContext context)
    {
      this.mapper = mapper;
      this.dbContext = context;
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetUser(string id)
    {
      var user = await dbContext.Users
        .Include(x => x.PivotalUser)
        .SingleOrDefaultAsync(e => e.UserId == id);
      
      return Ok(mapper.Map<UserModel>(user));
    }

    [HttpPost]
    [Route("createPivotalUser")]
    public async Task<IActionResult> createPivotalUser(PivotalUser model)
    {
      var result = await dbContext.PivotalUsers.AddAsync(model);
      await dbContext.SaveChangesAsync();
      
      return Ok("Add Stuff");
    }

  }
}