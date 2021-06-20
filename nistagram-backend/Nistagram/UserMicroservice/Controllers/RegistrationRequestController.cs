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
    public class RegistrationRequestController : Controller
    {
        private readonly IRegistrationRequestService _registrationRequestService;
        private readonly IProfileService _profileService;

        public RegistrationRequestController(IRegistrationRequestService registrationRequestService, IProfileService profileService)
        {
            _registrationRequestService = registrationRequestService;
            _profileService = profileService;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllRegistrationRequests()
        {
            List<RegistrationRequestDto> dtos = new List<RegistrationRequestDto>();
            foreach(RegistrationRequest request in await _registrationRequestService.GetAll())
            {
                dtos.Add(RegistrationRequestMapper.RegistrationRequestToRegistrationRequestDto(request));
            }
            return Ok(dtos);
        }

        [HttpPut("acceptRequest/{requestId}")]
        public async Task<IActionResult> AcceptRegistrationRequest(int requestId)
        {
            RegistrationRequest request = await _registrationRequestService.GetById(requestId);

            if (request == null)
            {
                return NoContent();
            }

            request.Accepted = true;
            request.Processed = true;

            await _profileService.ActivateAgentProfile(request.AgentId);
            return Ok(RegistrationRequestMapper.RegistrationRequestToRegistrationRequestDto(
                                                                         await _registrationRequestService.Update(request)));
        }

        [HttpPut("rejectRequest/{requestId}")]
        public async Task<IActionResult> RejectRegistrationRequest(int requestId)
        {
            RegistrationRequest request = await _registrationRequestService.GetById(requestId);

            if (request == null)
            {
                return NoContent();
            }

            request.Accepted = false;
            request.Processed = true;

            return Ok(RegistrationRequestMapper.RegistrationRequestToRegistrationRequestDto(
                                                                         await _registrationRequestService.Update(request)));
        }
    }
}
