using CampaignMicroservice.Model;
using CampaignMicroservice.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommercialController : Controller
    {
        private readonly ICommercialService _commercialService;

        public CommercialController(ICommercialService commercialService)
        {
            _commercialService = commercialService;
        }

        [HttpGet("agent/{id}")]
        public async Task<IActionResult> GetCommercialsForAgent(int id)
        {
            IEnumerable<Commercial> result = await _commercialService.GetCommercialsForAgent(id);

            if(!result.Any())
            {
                return NoContent();
            }

            return Ok(result);
        }
    }
}
