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

        public CampaignController(IRepeatableCampaignService repeatableCampaignService, ISingleCampaignService singlecampaignService)
        {
            _repeatablecampaignService = repeatableCampaignService;
            _singlecampaignService = singlecampaignService;
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


    }
}
