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
        private readonly IStoryHighlightsService _storyHighlightsService;

        public StoryController(IStoryService storyService, IProfileService profileService, IStoryHighlightsService storyHighlightsService)
        {
            _storyService = storyService;
            _profileService = profileService;
            _storyHighlightsService = storyHighlightsService;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            Story story = await _storyService.GetById(id);

            if (story == null)
            {
                return NoContent();
            }

            story.Publisher = await _profileService.GetProfileByOriginalId(story.PublisherId); 
            return Ok(StoryMapper.StoryToStoryDto(story));
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

        [HttpGet("active/profile/{profileId}")]
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

        [HttpGet("profile/{profileId}")]
        public async Task<IActionResult> GetStoriesForProfile(int profileId)
        {
            List<Story> storiesForProfile = await _storyService.GetStoriesForProfile(profileId);
            if (!storiesForProfile.Any())
            {
                return NoContent();
            }
            List<StoryDto> result = new List<StoryDto>();
            foreach (Story story in storiesForProfile)
            {
                StoryDto dto = StoryMapper.StoryToStoryDto(story);
                dto.ImageSrc = String.Format("http://localhost:55996/{0}", story.ImageName);
                result.Add(dto);
            }
            return Ok(result);
        }

        [HttpPost("highlight")]
        public async Task<IActionResult> AddStoryHighlight([FromBody] StoryHighlightDto dto)
        {
            StoryHighlight storyHighlight = StoryHighlightMapper.StoryHighlightDtoToStoryHighlight(dto);
            List<Story> stories = new List<Story>();
            foreach (string storyId in dto.StoriesIds)
            {
                stories.Add(await _storyService.GetById(storyId));
            }
            storyHighlight.Stories = stories;
            return Ok(await _storyHighlightsService.Insert(storyHighlight));
        }

        [HttpPut("delete/{storyId}")]
        public async Task<IActionResult> deleteStory(string storyId)
        {
            Story story = await _storyService.GetById(storyId);
            if (story == null)
            {
                BadRequest();
            }

            story.Deleted = true;
            StoryDto deletedStory = StoryMapper.StoryToStoryDto(await _storyService.Update(story));
            // pozovi storyUpdated message sender
            return Ok(deletedStory);
        }

        [HttpGet("highlight/profile/{profileId}")]
        public async Task<IActionResult> GetStoryHighlightsForProfile(int profileId)
        {
            List<StoryHighlight> storyHighlightsForProfile = await _storyHighlightsService.GetStoryHighlightsForProfile(profileId);
            if(!storyHighlightsForProfile.Any())
            {
                return NoContent();
            }
            List<StoryHighlightDto> result = new List<StoryHighlightDto>();
            foreach(StoryHighlight storyHighlight in storyHighlightsForProfile) 
            {
                result.Add(StoryHighlightMapper.StoryHighlightToStoryHighlightDto(storyHighlight));
            }

            return Ok(result);
        }

        [HttpPost("saveImage")]
        public async Task<IActionResult> SaveImage([FromForm] StoryDto dto)
        {
            await _storyService.SaveImageSrc(dto.ImageSrc);
            return Ok();
        }
    }
}
