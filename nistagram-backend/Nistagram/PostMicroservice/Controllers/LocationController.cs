using Microsoft.AspNetCore.Mvc;
using PostMicroservice.Model;
using PostMicroservice.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _locationService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            Location location = await _locationService.GetById(id);

            if (location == null)
            {
                return NoContent();
            }

            return Ok(location);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(Location location)
        {
            return Ok(await _locationService.Insert(location));
        }

    }
}
