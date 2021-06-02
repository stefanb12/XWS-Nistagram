using Microsoft.AspNetCore.Mvc;
using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserMicroservice.Dto;
using UserMicroservice.Mapper;
using UserMicroservice.Service;

namespace UserMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowRequestController : Controller
    {
        private readonly IFollowRequestService _followRequestService;

        public FollowRequestController(IFollowRequestService followRequestService)
        {
            _followRequestService = followRequestService;
        }

        [HttpPost]
        public async Task<IActionResult> SendFollowRequest([FromBody] FollowRequestDto dto)
        {
            FollowRequest result = await _followRequestService.Insert(FollowRequestMapper.FollowRequestDtoToFollowRequest(dto));
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteFollowRequest([FromBody] FollowRequestDto dto)
        {
            await _followRequestService.Delete(FollowRequestMapper.FollowRequestDtoToFollowRequest(dto));
            return Ok();
        }

        [HttpGet("{receiverId}/{senderId}")]
        public async Task<IActionResult> FindFollowRequest(int receiverId, int senderId)
        {
            FollowRequest result = await _followRequestService.FindFollowRequest(receiverId, senderId);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(FollowRequestMapper.FollowRequestToFollowRequestDto(result));
        }
    }
}
