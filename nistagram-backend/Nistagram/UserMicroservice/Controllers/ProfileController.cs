using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ProfileMicroservice.Model;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using UserMicroservice.Dto;
using UserMicroservice.Mapper;
using UserMicroservice.Model;
using UserMicroservice.Service;

namespace UserMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : Controller
    {
        private readonly IProfileService _profileService;
        private readonly IFollowRequestService _followRequestService;

        public ProfileController(IProfileService profileService, IFollowRequestService followRequestService)
        {
            _profileService = profileService;
            _followRequestService = followRequestService;
        }

        [HttpPost("registration")]
        public async Task<IActionResult> RegisterProfile(RegistrationDto registrationDto)
        {
            Profile profile = await _profileService.Insert(RegistrationMapper.RegistrationDtoToProfile(registrationDto));

            if (profile != null) 
            {
                return CreatedAtAction(nameof(GetById), new { id = profile.Id }, profile);
            }
            return BadRequest();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Profile profile = await _profileService.GetById(id);

            if (profile == null)
            {
                return NoContent();
            }

            return Ok(profile);
        }

        [HttpGet("{id}/followers")]
        public async Task<IActionResult> GetFolowers(int id)
        {
            List<Profile> followers = await _profileService.GetFollowers(id);

            List<ProfileDto> result = new List<ProfileDto>();
            followers.ToList().ForEach(follower => result.Add(ProfileMapper.ProfileToProfileDto(follower)));

            return Ok(result);
        }

        [HttpGet("{id}/following")]
        public async Task<IActionResult> GetFollowingProfiles(int id)
        {
            List<Profile> followingProfiles = await _profileService.GetFollowingProfiles(id);

            List<ProfileDto> result = new List<ProfileDto>();
            followingProfiles.ToList().ForEach(followingProfile => result.Add(ProfileMapper.ProfileToProfileDto(followingProfile)));

            return Ok(result);
        }

        [HttpPut("{profileId}/follow/{id}")]
        public async Task<IActionResult> FollowAnotherProfile(int profileId, int id)
        {
            ProfileFollower result = await _profileService.FollowAnotherProfile(profileId, id);
            if(result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPut("{profileId}/unfollow/{id}")]
        public async Task<IActionResult> UnfollowAnotherProfile(int profileId, int id)
        {
            ProfileFollower result = await _profileService.UnfollowAnotherProfile(profileId, id);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }   

        [HttpPut("update")]
        public async Task<IActionResult> UpdateProfile(ProfileDto profileDto)
        {
            Profile profile = await _profileService.GetById(profileDto.Id);

            if (profile == null)
            {
                return NoContent();
            }
            //profile.Username = profileDto.Username;
            //Profile updatedProfile = await _profileService.Update(profile);
            Profile updatedProfile = await _profileService.Update(UpdateProfileMapper.ProfileDtoToProfile(profile, profileDto));
            return Ok(updatedProfile);  
        }

        [HttpGet("{id}/profileForUpdating")]
        public async Task<IActionResult> GetProfileForUpdating(int id)
        {
            Profile profile = await _profileService.GetById(id);

            if (profile == null)
            {
                return NoContent();
            }

            ProfileDto dto = UpdateProfileMapper.ProfileToProfileDto(profile);

            return Ok(dto);
        }
    }
}
