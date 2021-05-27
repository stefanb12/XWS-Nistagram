using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ProfileMicroservice.Model;
using System.Text;
using System.Threading.Tasks;
using UserMicroservice.Dto;
using UserMicroservice.Service;

namespace UserMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IProfileService _profileService;
        private readonly AppSettings _appSettings;

        public AuthController(IProfileService profileService, IOptions<AppSettings> appSettings)
        {
            _profileService = profileService;
            _appSettings = appSettings.Value;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthenticateDto model)
        {
            User user = await _profileService.Authenticate(model.Username, model.Password, Encoding.ASCII.GetBytes(_appSettings.Secret));
            
            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(user);
        }
    }
}
