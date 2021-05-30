using Microsoft.AspNetCore.Mvc;
using PostMicroservice.Dto;
using PostMicroservice.Mapper;
using PostMicroservice.Model;
using PostMicroservice.Service;
using System.Threading.Tasks;

namespace PostMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        
        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _postService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            Post post = await _postService.GetById(id);

            if (post == null)
            {
                return NoContent();
            }

            //post.ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, post.ImageName);

            return Ok(post);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(PostDto postDto)
        {
            
            //post.ImageName = await _postService.SaveImage(post.ImageFile);


            return Ok(await _postService.Insert(PostMapper.PostDtoToPost(postDto)));
        }

        [HttpPut]
        public async Task<IActionResult> Update(Post post)
        {
            return Ok(await _postService.Update(post));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Post post)
        {
            await _postService.Delete(post.Id.ToString());
            return Ok();
        }
    }
}
