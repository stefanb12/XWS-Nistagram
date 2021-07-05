using CampaignMicroservice.Dto;
using CampaignMicroservice.Mapper;
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
    public class CampaignController : Controller
    {
        private readonly ISingleCampaignService _singlecampaignService;
        private readonly IRepeatableCampaignService _repeatablecampaignService;
        private readonly ICampaignRequestService _campaignRequestService;

        public CampaignController(IRepeatableCampaignService repeatableCampaignService, ISingleCampaignService singlecampaignService,
            ICampaignRequestService campaignRequestService)
        {
            _repeatablecampaignService = repeatableCampaignService;
            _singlecampaignService = singlecampaignService;
            _campaignRequestService = campaignRequestService;
        }

        [HttpPost]
        public async Task<IActionResult> InsertCampaign([FromBody] CampaignDto dto)
        {
            if(dto.IsSingleCampaign)
            {
                SingleCampaign singleCampaign = CampaignMapper.CampaignDtoToSingleCampaign(dto);
                return Ok(await _singlecampaignService.Insert(singleCampaign)); 
            } else
            {
                RepeatableCampaign repeatableCampaign = CampaignMapper.CampaignDtoToRepeatableCampaign(dto);
                return Ok(await _repeatablecampaignService.Insert(repeatableCampaign));
            }
        }

        [HttpGet("single/agent/{id}")]
        public async Task<IActionResult> GetSingleCampaignsForAgent(int id)
        {
            List<CampaignDto> result = new List<CampaignDto>();
            foreach(SingleCampaign singleCampaign in await _singlecampaignService.GetSingleCampaignsForAgent(id))
            {
                result.Add(CampaignMapper.CampaignToCampaignDto(singleCampaign, null));
            }

            if (!result.Any())
            {
                return NoContent();
            }

            return Ok(result);
        }

        [HttpGet("repeatable/agent/{id}")]
        public async Task<IActionResult> GetRepeatableCampaignsForAgent(int id)
        {
            List<CampaignDto> result = new List<CampaignDto>();
            foreach (RepeatableCampaign repeatableCampaign in await _repeatablecampaignService.GetRepeatableCampaignsForAgent(id))
            {
                result.Add(CampaignMapper.CampaignToCampaignDto(null, repeatableCampaign));
            }

            if (!result.Any())
            {
                return NoContent();
            }

            return Ok(result);
        }

        [HttpPost("sendCampaignRequest")]
        public async Task<IActionResult> SendCampaignRequest(CampaignRequestDto dto)
        {
            CampaignRequest campaignRequest = 
                await _campaignRequestService.Insert(CampaignRequestMapper.CampaignRequestDtoToCampaignRequest(dto));
            return Ok(campaignRequest);
        }

        [HttpGet("getCampaignRequestForCampaign/{id}")]
        public async Task<IActionResult> GetCampaignRequestForCampaign(int id)
        {
            List<CampaignRequest> requests = await _campaignRequestService.GetCampaignRequestsForCampaign(id);
            List<CampaignRequestDto> dtos = new List<CampaignRequestDto>();
            foreach(CampaignRequest request in requests)
            {
                dtos.Add(CampaignRequestMapper.CampaignRequestToCampaignRequestDto(request));
            }
            return Ok(requests);
        }

        [HttpPut("acceptCampaignRequest/{campaignId}/{influencerId}")]
        public async Task<IActionResult> AcceptCampaignRequest(int campaignId, int influencerId)
        {
            CampaignRequest campaignRequest = await _campaignRequestService.AcceptCampaignRequest(campaignId, influencerId);

            if(campaignRequest == null)
            {
                return BadRequest();
            }

            return Ok(campaignRequest);
        }

        [HttpPut("rejectCampaignRequest/{campaignId}/{influencerId}")]
        public async Task<IActionResult> RejectCampaignRequest(int campaignId, int influencerId)
        {
            CampaignRequest campaignRequest = await _campaignRequestService.RejectCampaignRequest(campaignId, influencerId);

            if (campaignRequest == null)
            {
                return BadRequest();
            }

            return Ok(campaignRequest);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCampaign(int id)
        {
            SingleCampaign singleCampaign = await _singlecampaignService.GetById(id);
            if(singleCampaign != null)
            {
                return Ok(CampaignMapper.CampaignToCampaignDto(singleCampaign, null));
            } else
            {
                RepeatableCampaign repeatableCampaign = await _repeatablecampaignService.GetById(id);
                return Ok(CampaignMapper.CampaignToCampaignDto(null, repeatableCampaign));
            }
        }
    }
}
