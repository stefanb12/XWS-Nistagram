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
    public class StoryController : Controller
    {
        private readonly IStoryService _storyService;

        public StoryController(IStoryService storyService)
        {
            _storyService = storyService;
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

    }
}
