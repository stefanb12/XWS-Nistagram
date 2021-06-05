using Microsoft.AspNetCore.Mvc;
using PostMicroservice.Dto;
using PostMicroservice.Mapper;
using PostMicroservice.Model;
using PostMicroservice.Service;
using System;
using System.Collections.Generic;
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
            /*List<Post> publicPosts = new List<Post>();

            foreach(Post post in await _postService.GetAll()) {
                publicPosts.Add(post);
            }

            if (publicPosts.Count == 0)
            {
                return NotFound();
            }

            List<PostDto> publicPostsDto = new List<PostDto>();
            foreach (Post post in publicPosts)
            {
                for (int i = 0; i < post.Contents.Count; i++)
                {
                    post.Contents[i].ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, post.Contents[i].ImageName);
                }
                publicPostsDto.Add(PostMapper.PostToPostDto(post));
            }

            return Ok(publicPostsDto);*/
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

            for(int i = 0; i < post.Contents.Count; i++)
            {
                post.Contents[i].ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, post.Contents[i].ImageName);
            }

            return Ok(post);
        }

        [HttpGet("public")]
        public async Task<IActionResult> GetPublicProfiles()
        {
            List<Post> publicPosts = await _postService.GetAllPublicPosts();
            if (publicPosts.Count == 0)
            {
                return NotFound();
            }

            List<PostDto> publicPostsDto = new List<PostDto>();
            foreach(Post post in publicPosts)
            {
                for (int i = 0; i < post.Contents.Count; i++)
                {
                    post.Contents[i].ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, post.Contents[i].ImageName);
                }
                publicPostsDto.Add(PostMapper.PostToPostDto(post));
            }

            return Ok(publicPostsDto);
        }

        [HttpPut("newComment")]
        public async Task<IActionResult> InsertNewComment([FromBody] UpdatePostDto commentDto)
        {
            Post post = await _postService.GetById(commentDto.PostId);
            for (int i = 0; i < post.Contents.Count; i++)
            {
                post.Contents[i].ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, post.Contents[i].ImageName);
            }

            Post updatedPost = await _postService.InsertNewComment(post, CommentMapper.CommentDtoToComment(commentDto));
            return Ok(PostMapper.PostToPostDto(updatedPost));
        }

        [HttpPut("like")]
        public async Task<IActionResult> LikePost([FromBody] UpdatePostDto updatePostDto)
        {
            Post post = await _postService.GetById(updatePostDto.PostId);
            for (int i = 0; i < post.Contents.Count; i++)
            {
                post.Contents[i].ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, post.Contents[i].ImageName);
            }

            Post updatedPost = await _postService.LikePost(post, ProfileMapper.ProfileDtoToProfile(updatePostDto));
            return Ok(PostMapper.PostToPostDto(updatedPost));
        }

        [HttpPut("dislike")]
        public async Task<IActionResult> DisikePost([FromBody] UpdatePostDto updatePostDto)
        {
            Post post = await _postService.GetById(updatePostDto.PostId);
            for (int i = 0; i < post.Contents.Count; i++)
            {
                post.Contents[i].ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, post.Contents[i].ImageName);
            }

            Post updatedPost = await _postService.DisikePost(post, ProfileMapper.ProfileDtoToProfile(updatePostDto));
            return Ok(PostMapper.PostToPostDto(updatedPost));
        }

        [HttpPut("favorite")]
        public async Task<IActionResult> SavePostAsFavorite([FromBody] UpdatePostDto updatePostDto)
        {
            Post post = await _postService.GetById(updatePostDto.PostId);
            for (int i = 0; i < post.Contents.Count; i++)
            {
                post.Contents[i].ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, post.Contents[i].ImageName);
            }

            Post updatedPost = await _postService.SavePostAsFavorite(post, ProfileMapper.ProfileDtoToProfile(updatePostDto));
            return Ok(PostMapper.PostToPostDto(updatedPost));
        }

        [HttpPost]
        public async Task<IActionResult> Insert([FromForm] PostDto postDto)
        {
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
