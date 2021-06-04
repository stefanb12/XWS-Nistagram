using Microsoft.AspNetCore.Http;
using StoryMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Service
{
    public interface IStoryService : IService<Story>
    {
        Task<string> SaveImage(IFormFile imageFile);
    }
}
