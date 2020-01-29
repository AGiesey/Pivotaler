using System;
using System.Collections.Generic;
using Data.User;
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

    // [HttpGet]
    // public ActionResult<IEnumerable<UserModel>> GetAll()
    // {
    //   return contex
    // }

    [HttpPost]
    public ActionResult<UserModel> Create(UserModel user)
    {
      context.Add(user);
      context.SaveChanges();
      
      return Ok(user);
    }
    
  }
}