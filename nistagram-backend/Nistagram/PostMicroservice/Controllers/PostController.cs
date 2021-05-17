using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PostMicroservice.Model;
using PostMicroservice.Service;
using System;
using System.Collections.Generic;
using System.Linq;
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
            Console.WriteLine("aaaaaaaaaaaaa");
            var c = await _postService.GetAll();
            return Ok(c);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            Post post = await _postService.GetById(id);

            if (post == null)
            {
                return NoContent();
            }

            return Ok(post);
        }

        [HttpPost]
        public async Task<IActionResult> Insert(Post post)
        {
            return Ok(await _postService.Insert(post));
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
