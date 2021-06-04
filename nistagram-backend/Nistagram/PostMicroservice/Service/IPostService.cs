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
    }
}
