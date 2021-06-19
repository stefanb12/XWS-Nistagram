using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShop.Dto;
using WebShop.Model;
using WebShop.Service;

namespace WebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly AppSettings _appSettings;

        public AuthController(IUserService userService, IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _appSettings = appSettings.Value;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthenticateDto model)
        {
            User user = await _userService.Authenticate(model.Username, model.Password, Encoding.ASCII.GetBytes(_appSettings.Secret));

            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(user);
        }
    }
}
