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
        private readonly IProfileService _profileService;

        public PostController(IPostService postService, IProfileService profileService)
        {
            _postService = postService;
            _profileService = profileService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _postService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Post post = await _postService.GetById(id);

            if (post == null)
            {
                return NoContent();
            }

            List<PostDto> dto = new List<PostDto>();
            for (int i = 0; i < post.Contents.Count; i++)
            {
                post.Contents[i].ImageSrc = String.Format("http://localhost:55993/{0}", post.Contents[i].ImageName);
            }
            dto.Add(PostMapper.PostToPostDto(post));

            return Ok(dto);
        }

        [HttpGet("profile/{profileId}")]
        public async Task<IActionResult> GetPostsForProfile(int profileId)
        {
            List<Post> postsForProfile = await _postService.GetPostsForProfile(profileId);
            if (postsForProfile.Count == 0)
            {
                return NotFound();
            }

            List<PostDto> postsForProfileDto = new List<PostDto>();
            foreach (Post post in postsForProfile)
            {
                for (int i = 0; i < post.Contents.Count; i++)
                {
                    post.Contents[i].ImageSrc = String.Format("http://localhost:55993/{0}", post.Contents[i].ImageName);
                }
                postsForProfileDto.Add(PostMapper.PostToPostDto(post));
            }

            return Ok(postsForProfileDto);
        }

        [HttpGet("favorites/{profileId}")]
        public async Task<IActionResult> GetFavoritePostsForProfile(int profileId)
        {
            List<Post> favoritePosts = await _postService.GetFavoritePostsForProfile(profileId);
            if (favoritePosts.Count == 0)
            {
                return NotFound();
            }

            List<PostDto> favoritePostsDto = new List<PostDto>();
            foreach (Post post in favoritePosts)
            {
                for (int i = 0; i < post.Contents.Count; i++)
                {
                    post.Contents[i].ImageSrc = String.Format("http://localhost:55993/{0}", post.Contents[i].ImageName);
                }
                favoritePostsDto.Add(PostMapper.PostToPostDto(post));
            }

            return Ok(favoritePostsDto);
        }

        [HttpGet("likedAndDislikedPosts/{profileId}")]
        public async Task<IActionResult> GetLikedAndDislikedPosts(int profileId)
        {
            List<Post> likedAndDislikedPosts = await _postService.GetLikedAndDislikedPosts(profileId);
            if (likedAndDislikedPosts.Count == 0)
            {
                return NotFound();
            }

            List<PostDto> likedAndDislikedPostsDto = new List<PostDto>();
            foreach (Post post in likedAndDislikedPosts)
            {
                for (int i = 0; i < post.Contents.Count; i++)
                {
                    post.Contents[i].ImageSrc = String.Format("http://localhost:55993/{0}", post.Contents[i].ImageName);
                }
                likedAndDislikedPostsDto.Add(PostMapper.PostToPostDto(post));
            }

            return Ok(likedAndDislikedPostsDto);
        }

        [HttpGet("postsFromFollowedProfiles/{profileId}")]
        public async Task<IActionResult> GetPostsFromFollowedProfiles(int profileId)
        {
            List<Post> posts = await _postService.GetPostsFromFollowedProfiles(profileId);
            if (posts.Count == 0)
            {
                return NotFound();
            }

            List<PostDto> postsDto = new List<PostDto>();
            foreach (Post post in posts)
            {
                for (int i = 0; i < post.Contents.Count; i++)
                {
                    post.Contents[i].ImageSrc = String.Format("http://localhost:55993/{0}", post.Contents[i].ImageName);
                }
                postsDto.Add(PostMapper.PostToPostDto(post));
            }

            return Ok(postsDto);
        }

        [HttpGet("public/{profileId}")]
        public async Task<IActionResult> GetPublicPosts(int profileId)
        {
            List<Post> publicPosts = await _postService.GetAllPublicPosts(profileId);
            if (publicPosts.Count == 0)
            {
                return NotFound();
            }

            List<PostDto> publicPostsDto = new List<PostDto>();
            foreach (Post post in publicPosts)
            {
                for (int i = 0; i < post.Contents.Count; i++)
                {
                    post.Contents[i].ImageSrc = String.Format("http://localhost:55993/{0}", post.Contents[i].ImageName);
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
                post.Contents[i].ImageSrc = String.Format("http://localhost:55993/{0}", post.Contents[i].ImageName);
            }

            Profile publisher = await _profileService.GetById(commentDto.Publisher.Id);
            Post updatedPost = await _postService.InsertNewComment(post, CommentMapper.CommentDtoToComment(commentDto, publisher));
            return Ok(PostMapper.PostToPostDto(updatedPost));
        }

        [HttpPut("like")]
        public async Task<IActionResult> LikePost([FromBody] UpdatePostDto updatePostDto)
        {
            Post post = await _postService.GetById(updatePostDto.PostId);
            for (int i = 0; i < post.Contents.Count; i++)
            {
                post.Contents[i].ImageSrc = String.Format("http://localhost:55993/{0}", post.Contents[i].ImageName);
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
                post.Contents[i].ImageSrc = String.Format("http://localhost:55993/{0}", post.Contents[i].ImageName);
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
                post.Contents[i].ImageSrc = String.Format("http://localhost:55993/{0}", post.Contents[i].ImageName);
            }

            Post updatedPost = await _postService.SavePostAsFavorite(post, ProfileMapper.ProfileDtoToProfile(updatePostDto));
            return Ok(PostMapper.PostToPostDto(updatedPost));
        }

        [HttpPut("delete/{postId}")]
        public async Task<IActionResult> DeletePost(int postId)
        {
            Post post = await _postService.GetById(postId);
            if (post == null)
            {
                BadRequest();
            }
            
            post.Deleted = true;
            PostDto deletedPost = PostMapper.PostToPostDto(await _postService.Update(post));
            // pozovi postUpdated message sender
            return Ok(deletedPost);
        }

        [HttpGet("search/{searchParam}")]
        public async Task<IActionResult> GetSearchResult(string searchParam)
        {
            List<Post> searchedPosts = await _postService.GetSearchResult(searchParam);
            if (searchedPosts.Count == 0)
            {
                return NotFound();
            }

            List<PostDto> publicPostsDto = new List<PostDto>();
            foreach (Post post in searchedPosts)
            {
                for (int i = 0; i < post.Contents.Count; i++)
                {
                    post.Contents[i].ImageSrc = String.Format("http://localhost:55993/{0}", post.Contents[i].ImageName);
                }
                publicPostsDto.Add(PostMapper.PostToPostDto(post));
            }

            return Ok(publicPostsDto);
        }

        [HttpPost]
        public async Task<IActionResult> Insert([FromForm] PostDto postDto)
        {
            Profile publisher = await _profileService.GetById(postDto.Publisher.Id);
            return Ok(await _postService.Insert(PostMapper.PostDtoToPost(postDto, publisher)));
        }

        [HttpPut]
        public async Task<IActionResult> Update(Post post)
        {
            return Ok(await _postService.Update(post));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Post post)
        {
            await _postService.Delete(post.Id);
            return Ok();
        }
    }
}
