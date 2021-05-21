using Microsoft.AspNetCore.Mvc;
using ProfileMicroservice.Model;
using ProfileMicroservice.Service;
using System.Threading.Tasks;

namespace ProfileMicroservice.Controllers
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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _userService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            User user = await _userService.GetById(id);

            if(user == null)
            {
                return NoContent();
            }

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(User user)
        {
            return Ok(await _userService.Insert(user));
        }

        [HttpPut]
        public async Task<IActionResult> Update(User user)
        {
            return Ok(await _userService.Update(user));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(User user)
        {
            await _userService.Delete(user);
            return Ok();
        }

    }
}
