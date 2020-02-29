using System;
using System.Threading.Tasks;
using AutoMapper;
using Data;
using Data.Entities.Pivotal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.Controllers.Models.Users;
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

    [HttpGet]
    [Route("pivotal/{userId}")]
    public async Task<IActionResult> getPivotalUser(string userId)
    {
      var result = await dbContext.PivotalUsers
        .SingleOrDefaultAsync(x => x.UserId == userId);

      if (result != null)
      {
        return Ok(mapper.Map<PivotalUserModel>(result));
      }

      return NotFound($"PivotalUser with userId {userId} not found");
    }

    [HttpPost]
    [Route("pivotal")]
    public async Task<IActionResult> createPivotalUser(PivotalUser model)
    {
      var result = await dbContext.PivotalUsers.AddAsync(model);
      await dbContext.SaveChangesAsync();
      
      //TODO: user 201 Created with location header
      return Ok();
    }

    [HttpPut]
    [Route("pivotal/{userId}")]
    public async Task<IActionResult> updatePivotalUser(string userId, PivotalUserModel model)
    {
      if (ModelState.IsValid) 
      {
        var existingPivotalUser = await dbContext.PivotalUsers
          .SingleOrDefaultAsync(x => x.UserId == userId);
        
        if (existingPivotalUser != null)
        {
          //TODO: I think there's an automatic way to do this but got "Could not track" error
          existingPivotalUser.PivotalUserId = model.PivotalUserId;
          existingPivotalUser.PivotalApiKey = model.PivotalApiKey;
          existingPivotalUser.PivotalUserInitials = model.PivotalUserInitials;

          var result = dbContext.PivotalUsers.Update(existingPivotalUser);
          await dbContext.SaveChangesAsync();

          return Ok(mapper.Map<PivotalUserModel>(result.Entity));
        }

        return NotFound($"A PivotalUser with the id {userId} could not be found");
      }
      return BadRequest();
    }

    [HttpDelete]
    [Route("pivotal/{userId}")]
    public Task<IActionResult> deletePivotalUser(string userId)
    {
      throw new NotImplementedException();
    }

  }
}