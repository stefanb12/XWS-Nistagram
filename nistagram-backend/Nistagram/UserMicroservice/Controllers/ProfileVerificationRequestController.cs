using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProfileMicroservice.Model;
using UserMicroservice.Dto;
using UserMicroservice.Mapper;
using UserMicroservice.Service;

namespace UserMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileVerificationRequestController : Controller
    {
        private readonly IProfileVerificationRequestService _profileVerificationRequestService;
        private readonly IProfileService _profileService;

        public ProfileVerificationRequestController(IProfileVerificationRequestService profileVerificationRequestService, 
                                                    IProfileService profileService)
        {
            _profileVerificationRequestService = profileVerificationRequestService;
            _profileService = profileService;
        }

        [HttpPost]
        public async Task<IActionResult> InsertProfileVerificationRequest([FromForm] ProfileVerificationRequestDto dto)
        {
            ProfileVerificationRequest result = await _profileVerificationRequestService.Insert(
                ProfileVerificationRequestMapper.ProfileVerificationRequestDtoToProfileVerificationRequest(dto));
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }
    }
}
