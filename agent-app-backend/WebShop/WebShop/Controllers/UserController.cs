using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Dto;
using WebShop.Mapper;
using WebShop.Model;
using WebShop.Service;

namespace WebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            User user = await _userService.GetById(id);

            if (user == null)
            {
                return NoContent();
            }

            return Ok(user);
        }

        [HttpPost("registration")]
        public async Task<IActionResult> RegisterUser(RegistrationDto registrationDto)
        {
            User user = await _userService.Insert(RegistrationMapper.RegistrationDtoToUser(registrationDto));

            if (user != null)
            {
                return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
            }
            return BadRequest();
        }
    }
}
