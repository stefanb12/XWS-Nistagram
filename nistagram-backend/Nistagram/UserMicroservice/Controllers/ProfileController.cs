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
            profile.ImageSrc = String.Format("http://localhost:55988/{0}", profile.ImageName);

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
            foreach(Profile follower in followers)
            {
                ProfileDto dto = ProfileMapper.ProfileToProfileDto(follower);
                dto.ImageSrc = String.Format("http://localhost:55988/{0}", follower.ImageName);
                result.Add(dto);
            }

            return Ok(result);
        }

        [HttpGet("{id}/following")]
        public async Task<IActionResult> GetFollowingProfiles(int id)
        {
            List<Profile> followingProfiles = await _profileService.GetFollowingProfiles(id);

            List<ProfileDto> result = new List<ProfileDto>();
            foreach (Profile followingProfile in followingProfiles)
            {
                ProfileDto dto = ProfileMapper.ProfileToProfileDto(followingProfile);
                dto.Id = followingProfile.Id;
                dto.ImageSrc = String.Format("http://localhost:55988/{0}", followingProfile.ImageName);
                result.Add(dto);
            }
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
        public async Task<IActionResult> UpdateProfile([FromForm] UpdateDto profileDto)
        {
            Profile profile = await _profileService.GetById(profileDto.Id);

            if (profile == null)
            {
                return NoContent();
            }

            if (profile.Username.Equals(profileDto.Username))
            {
                await _profileService.UpdateWithImage(UpdateProfileMapper.ProfileDtoToProfile(profile, profileDto), profileDto.ImageFile);
                return Ok();
            }

            IEnumerable<Profile> profiles = await _profileService.GetAll();
            if (!_profileService.DoesUsernameExist(profileDto.Username, profiles))
            {
                await _profileService.UpdateWithImage(UpdateProfileMapper.ProfileDtoToProfile(profile, profileDto), profileDto.ImageFile);
                return Ok();
            }
            
            return BadRequest();  
        }

        [HttpGet("{id}/profileForUpdating")]
        public async Task<IActionResult> GetProfileForUpdating(int id)
        {
            Profile profile = await _profileService.GetById(id);
            profile.ImageSrc = String.Format("http://localhost:55988/{0}", profile.ImageName);

            if (profile == null)
            {
                return NoContent();
            }

            UpdateDto dto = UpdateProfileMapper.ProfileToProfileDto(profile);

            return Ok(dto);
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            List<UpdateDto> dtos = new List<UpdateDto>();
            foreach(Profile profile in await _profileService.GetAll())
            {
                profile.ImageSrc = String.Format("http://localhost:55988/{0}", profile.ImageName);
                UpdateDto dto = UpdateProfileMapper.ProfileToProfileDto(profile);
                dtos.Add(dto);
            }

            return Ok(dtos);
        }

        [HttpGet("{id}/muted")]
        public async Task<IActionResult> GetMutedProfiles(int id)
        {
            List<Profile> mutedProfiles = await _profileService.GetMutedProfiles(id);

            List<ProfileDto> result = new List<ProfileDto>();
            foreach (Profile mutedProfile in mutedProfiles)
            {
                ProfileDto dto = ProfileMapper.ProfileToProfileDto(mutedProfile);
                dto.ImageSrc = String.Format("http://localhost:55988/{0}", mutedProfile.ImageName);
                result.Add(dto);
            }
            return Ok(result);
        }

        [HttpPut("{profileId}/mute/{id}")]
        public async Task<IActionResult> muteProfile(int profileId, int id)
        {
            ProfileMutedProfile result = await _profileService.MuteProfile(profileId, id);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPut("{profileId}/unmute/{id}")]
        public async Task<IActionResult> unmuteProfile(int profileId, int id)
        {
            ProfileMutedProfile result = await _profileService.UnmuteProfile(profileId, id);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpGet("{id}/blocked")]
        public async Task<IActionResult> GetBlockedProfiles(int id)
        {
            List<Profile> blockedProfiles = await _profileService.GetBlockedProfiles(id);

            List<ProfileDto> result = new List<ProfileDto>();
            foreach (Profile blockedProfile in blockedProfiles)
            {
                ProfileDto dto = ProfileMapper.ProfileToProfileDto(blockedProfile);
                dto.ImageSrc = String.Format("http://localhost:55988/{0}", blockedProfile.ImageName);
                result.Add(dto);
            }
            return Ok(result);
        }

        [HttpPut("{profileId}/block/{id}")]
        public async Task<IActionResult> blockProfile(int profileId, int id)
        {
            ProfileBlockedProfile result = await _profileService.BlockProfile(profileId, id);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPut("{profileId}/unblock/{id}")]
        public async Task<IActionResult> unblockProfile(int profileId, int id)
        {
            ProfileBlockedProfile result = await _profileService.UnBlockProfile(profileId, id);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpGet("{id}/closeFriends")]
        public async Task<IActionResult> GetCloseFriends(int id)
        {
            List<Profile> closeFriends = await _profileService.GetCloseFriends(id);

            List<ProfileDto> result = new List<ProfileDto>();
            foreach (Profile closeFriend in closeFriends)
            {
                ProfileDto dto = ProfileMapper.ProfileToProfileDto(closeFriend);
                dto.ImageSrc = String.Format("http://localhost:55988/{0}", closeFriend.ImageName);
                result.Add(dto);
            }
            return Ok(result);
        }

        [HttpPut("{profileId}/addCloseFriends/{id}")]
        public async Task<IActionResult> AddCloseFriends(int profileId, int id)
        {
            ProfileCloseFriend result = await _profileService.AddCloseFriend(profileId, id);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPut("{profileId}/removeCloseFriends/{id}")]
        public async Task<IActionResult> RemoveCloseFriends(int profileId, int id)
        {
            ProfileCloseFriend result = await _profileService.RemoveCloseFriend(profileId, id);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpGet("{id}/notificationProfiles")]
        public async Task<IActionResult> GetNotificationProfiles(int id)
        {
            List<Profile> notificationProfiles = await _profileService.GetNotificationProfiles(id);

            List<ProfileDto> result = new List<ProfileDto>();
            foreach (Profile notificationProfile in notificationProfiles)
            {
                ProfileDto dto = ProfileMapper.ProfileToProfileDto(notificationProfile);
                dto.ImageSrc = String.Format("http://localhost:55988/{0}", notificationProfile.ImageName);
                result.Add(dto);
            }
            return Ok(result);
        }

        [HttpPut("{profileId}/addNotificationProfile/{id}")]
        public async Task<IActionResult> AddNotificationProfile(int profileId, int id)
        {
            ProfileNotificationProfile result = await _profileService.AddNotificationProfile(profileId, id);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPut("{profileId}/removeNotificationProfile/{id}")]
        public async Task<IActionResult> RemoveNotificationProfile(int profileId, int id)
        {
            ProfileNotificationProfile result = await _profileService.RemoveNotificationProfile(profileId, id);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpGet("{id}/getProfilePrivacy")]
        public async Task<IActionResult> GetProfilePrivacy(int id)
        {
            Profile profile = await _profileService.GetById(id);
            ProfileSettings profileSettings = await _profileService.GetProfileSettingsById(id);

            if (profile == null || profileSettings == null)
            {
                return NoContent();
            }

            ProfilePrivacyDto dto = new ProfilePrivacyDto();
            dto.Id = profile.Id;
            dto.IsPrivate = profile.IsPrivate;
            dto.ReceiveAllMessages = profileSettings.ReceiveAllMessages;
            dto.TagAllowed = profileSettings.TagAllowed;

            return Ok(dto);
        }

        [HttpPut("updateProfilePrivacy")]
        public async Task<IActionResult> UpdateProfilePrivacy(ProfilePrivacyDto profilePrivacyDto)
        {
            Profile profile = await _profileService.GetById(profilePrivacyDto.Id);
            ProfileSettings profileSettings = await _profileService.GetProfileSettingsById(profilePrivacyDto.Id);

            if (profile == null || profileSettings == null)
            {
                return NoContent();
            }

            profile.IsPrivate = profilePrivacyDto.IsPrivate;
            await _profileService.Update(profile);

            profileSettings.ReceiveAllMessages = profilePrivacyDto.ReceiveAllMessages;
            profileSettings.TagAllowed = profilePrivacyDto.TagAllowed;
            await _profileService.UpdateProfileSettings(profileSettings);

            return Ok(profileSettings);
        }
    }
}
