using Microsoft.AspNetCore.Mvc;
using ProfileMicroservice.Model;
using ProfileMicroservice.Service;

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
        public IActionResult GetAll()
        {
            return Ok(_userService.GetAll());
        }

        [HttpGet("/{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_userService.GetById(id));
        }

        [HttpPost]
        public IActionResult Insert(User user)
        {
            return Ok(_userService.Insert(user));
        }

        [HttpPut]
        public IActionResult Update(User user)
        {
            return Ok(_userService.Update(user));
        }

        [HttpDelete]
        public IActionResult Delete(User user)
        {
            _userService.Delete(user);
            return Ok();
        }

    }
}
