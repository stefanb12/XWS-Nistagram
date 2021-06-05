﻿using Microsoft.AspNetCore.Http;
using PostMicroservice.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PostMicroservice.Service
{
    public interface IPostService : IService<Post>
    {
        Task<List<Post>> GetAllPublicPosts();
        Task<string> SaveImage(IFormFile imageFile);
        Task<Post> InsertNewComment(Post post, Comment comment);
        Task<Post> LikePost(Post post, Profile profile);
        Task<Post> DisikePost(Post post, Profile profile);
        Task<List<Post>> GetSearchResult(string searchParam);
        Task<Post> SavePostAsFavorite(Post post, Profile profile);
    }
}
