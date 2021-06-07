using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StoryMicroservice.Dto;
using StoryMicroservice.Mapper;
using StoryMicroservice.Model;
using StoryMicroservice.Service;

namespace StoryMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoryController : ControllerBase
    {
        private readonly IStoryService _storyService;
        private readonly IProfileService _profileService;

        public StoryController(IStoryService storyService, IProfileService profileService)
        {
            _storyService = storyService;
            _profileService = profileService;
        }

        [HttpPost]
        public async Task<IActionResult> Insert([FromForm] InsertStoryDto dto)
        {
            List<Story> returnValue = new List<Story>();
            foreach (Story story in StoryMapper.StoryDtoToStories(dto))
            {
                returnValue.Add(await _storyService.Insert(story));
            }
            return Ok(returnValue);
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            var stories = await _storyService.GetAll();
            List<StoryDto> returnValue = new List<StoryDto>();
            foreach (Story s in stories)
            {
                StoryDto dto = StoryMapper.StoryToStoryDto(s);
                dto.ImageSrc = String.Format("http://localhost:55996/{0}", s.ImageName);
                returnValue.Add(dto);
            }
            return Ok(returnValue);
        }

        [HttpGet("getAllProfileStories/{id}")]
        public async Task<IActionResult> GetFollowingProfilesStories(int id)
        {
            var profilesStories = await _profileService.GetFollowingProfilesActiveStories(id);
            List<ProfileStoriesDto> returnValue = new List<ProfileStoriesDto>();
            foreach (ProfileStories ps in profilesStories)
            {
                ProfileStoriesDto dto = ProfileStoriesMapper.ProfileStoriesToProfileStoriesDto(ps);
                foreach (StoryDto storyDto in dto.Stories)
                {
                    storyDto.ImageSrc = String.Format("http://localhost:55996/{0}", storyDto.ImageName);
                }
                returnValue.Add(dto);
            }
            return Ok(returnValue);
        }

        [HttpGet("profile/{profileId}")]
        public async Task<IActionResult> GetActiveStoriesForProfile(int profileId)
        {
            List<Story> activeProfileStories = await _storyService.GetActiveStoriesForProfile(profileId);
            if(!activeProfileStories.Any())
            {
                return NoContent();
            }
            List<StoryDto> result = new List<StoryDto>();
            foreach (Story story in activeProfileStories)
            {
                StoryDto dto = StoryMapper.StoryToStoryDto(story);
                dto.ImageSrc = String.Format("http://localhost:55996/{0}", story.ImageName);
                result.Add(dto);
            }
            return Ok(result);
        }
    }
}
