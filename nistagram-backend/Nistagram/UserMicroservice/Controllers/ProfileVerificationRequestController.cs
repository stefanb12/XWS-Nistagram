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

        [HttpPut("accept/{requestId}")]
        public async Task<IActionResult> AcceptRequest(int requestId)
        {
            ProfileVerificationRequest profileVerificationRequest = await _profileVerificationRequestService.GetById(requestId);

            if (profileVerificationRequest == null)
            {
                return NoContent();
            }

            profileVerificationRequest.Processed = true;
            profileVerificationRequest.Accepted = true;
            await _profileService.SetProfileCategory(profileVerificationRequest.ProfileId, profileVerificationRequest.Category);

            ProfileVerificationRequestDto dto = ProfileVerificationRequestMapper.ProfileVerificationRequestToProfileVerificationRequestDto(await _profileVerificationRequestService.Update(profileVerificationRequest));
            return Ok(dto);
        }

        [HttpPut("reject/{requestId}")]
        public async Task<IActionResult> RejcetRequest(int requestId)
        {
            ProfileVerificationRequest profileVerificationRequest = await _profileVerificationRequestService.GetById(requestId);

            if (profileVerificationRequest == null)
            {
                return NoContent();
            }

            profileVerificationRequest.Processed = true;
            profileVerificationRequest.Accepted = false;

            ProfileVerificationRequestDto dto = ProfileVerificationRequestMapper.ProfileVerificationRequestToProfileVerificationRequestDto(await _profileVerificationRequestService.Update(profileVerificationRequest));
            return Ok(dto);
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            List<ProfileVerificationRequestDto> dtos = new List<ProfileVerificationRequestDto>();
            foreach (ProfileVerificationRequest profileVerificationRequest in await _profileVerificationRequestService.GetAll())
            {
                profileVerificationRequest.Profile = await _profileService.GetById(profileVerificationRequest.ProfileId);
                profileVerificationRequest.ImageSrc = String.Format("http://localhost:55988/{0}", profileVerificationRequest.ImageName);
                ProfileVerificationRequestDto dto = ProfileVerificationRequestMapper.ProfileVerificationRequestToProfileVerificationRequestDto(profileVerificationRequest);
                dtos.Add(dto);
            }

            return Ok(dtos.OrderByDescending(request => !request.Processed).ToList());
        }
    }
}
