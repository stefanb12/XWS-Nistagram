using InappropriateContentMicroservice.Dto;
using InappropriateContentMicroservice.Mapper;
using InappropriateContentMicroservice.Model;
using InappropriateContentMicroservice.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace InappropriateContentMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InappropriateContentController : Controller
    {
        private readonly IInappropriateContentService _inappropriateContentService;
        private readonly IProfileService _profileService;
        private readonly IPostService _postService;
        private readonly IStoryService _storyService;

        public InappropriateContentController(IInappropriateContentService inappropriateContentService, IProfileService profileService, IPostService postService, IStoryService storyService)
        {
            _inappropriateContentService = inappropriateContentService;
            _profileService = profileService;
            _postService = postService;
            _storyService = storyService;
        }


        [HttpPost()]
        public async Task<IActionResult> SaveInappropriateContent([FromBody] InappropriateContentDto dto)
        {
            Story story = await _storyService.GetByOriginalId(dto.StoryId);
            InappropriateContent inappropriateContent = InappropriateContentMapper.InappropriateContentDtoToInappropriateContent(dto, story);
            
            if(await _inappropriateContentService.DoesInappropriateContentExist(inappropriateContent, dto.StoryId))
            {
                return BadRequest();
            }

            return Ok(await _inappropriateContentService.Insert(inappropriateContent));
        }
    }
}
