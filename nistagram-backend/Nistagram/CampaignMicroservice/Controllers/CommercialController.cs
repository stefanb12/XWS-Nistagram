using CampaignMicroservice.Dto;
using CampaignMicroservice.Mapper;
using CampaignMicroservice.Model;
using CampaignMicroservice.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommercialController : Controller
    {
        private readonly ICommercialService _commercialService;
        private readonly IProfileService _profileService;

        public CommercialController(ICommercialService commercialService, IProfileService profileService)
        {
            _commercialService = commercialService;
            _profileService = profileService;
        }

        [HttpPost]
        public async Task<IActionResult> InsertCommercial([FromForm] CommercialDto commercialDto)
        {
            var stream = commercialDto.APIToken;
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(stream);
            var tokenS = jsonToken as JwtSecurityToken;
            var agentUsername = tokenS.Claims.First(claim => claim.Type == "AgentUsername").Value;

            Profile agent = await _profileService.GetAgentByUsername(agentUsername);
            if (agent == null)
            {
                return Unauthorized();
            }

            return Ok(await _commercialService.Insert(CommercialMapper.CommercialDtoToCommercial(commercialDto, agent)));
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
