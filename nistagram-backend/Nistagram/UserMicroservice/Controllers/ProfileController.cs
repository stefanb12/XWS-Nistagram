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
    public class ProfileController : Controller
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _profileService.GetAll());
        }

        [HttpPost("registration")]
        public async Task<IActionResult> RegisterProfile(RegistrationDto registrationDto)
        {
            Profile profile = await _profileService.Insert(RegistrationMapper.RegistrationDtoToProfile(registrationDto));
            return Ok(profile);
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
    }
}
