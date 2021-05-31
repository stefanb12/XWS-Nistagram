using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using PostMicroservice.Model;
using PostMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Service
{
    public class PostService : IPostService
    {
        private IPostRepository _postRepository;
        private readonly IWebHostEnvironment _hostEnvironment;

        public PostService(IPostRepository postRepository, IWebHostEnvironment hostEnvironment)
        {
            _postRepository = postRepository;
            _hostEnvironment = hostEnvironment;
        }

        public async Task<Post> GetById(string id)
        {
            return await _postRepository.GetById(id);
        }

        public async Task<IEnumerable<Post>> GetAll()
        {
            return await _postRepository.GetAll();
        }

        public async Task<Post> Insert(Post entity)
        {
            foreach(Content content in entity.Contents)
            {
                content.ImageName = await SaveImage(content.ImageFile);
            }
            entity.PublishingDate = DateTime.Now;
            return await _postRepository.Insert(entity);
        }

        public async Task<Post> Update(Post entity)
        {
            await _postRepository.Update(entity);
            return entity;
        }

        public async Task Delete(string id)
        {
            await _postRepository.Delete(id);
        }

        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
