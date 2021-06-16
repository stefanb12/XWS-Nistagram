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

        public InappropriateContentController(IInappropriateContentService inappropriateContentService)
        {
            _inappropriateContentService = inappropriateContentService;
        }


        [HttpPost()]
        public async Task<IActionResult> SaveInappropriateContent([FromBody] InappropriateContentDto dto)
        {
            InappropriateContent inappropriateContent = InappropriateContentMapper.InappropriateContentDtoToInappropriateContent(dto);
            
            if(await _inappropriateContentService.DoesInappropriateContentExist(inappropriateContent))
            {
                return BadRequest();
            }

            inappropriateContent = await _inappropriateContentService.Insert(inappropriateContent);

            if (inappropriateContent == null)
            {
                return BadRequest();
            }

            return Ok(inappropriateContent);
        }
    }
}
