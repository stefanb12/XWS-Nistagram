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

            /*var integrationEventData = JsonConvert.SerializeObject(new
            {
                id = profile.Id,
                name = profile.FullName
            });
            PublishToMessageQueue("user.postservice", integrationEventData);*/
            if (profile != null) 
            {
                return CreatedAtAction(nameof(GetById), new { id = profile.Id }, profile);
            }
            return BadRequest();
        }

       /* private void PublishToMessageQueue(string integrationEvent, string eventData)
        {
            // TOOO: Reuse and close connections and channel, etc, 
            var factory = new ConnectionFactory();
            var connection = factory.CreateConnection();
            var channel = connection.CreateModel();
            var body = Encoding.UTF8.GetBytes(eventData);
            channel.BasicPublish(exchange: "",
                                 routingKey: integrationEvent,
                                 basicProperties: null,
                                 body: body);
        }*/

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
    }
}
