using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using StoryMicroservice.Model;
using StoryMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Service
{
    public class StoryService : IStoryService
    {
        private IStoryRepository _storyRepository;

        private readonly IWebHostEnvironment _hostEnvironment;

        public StoryService(IStoryRepository storyRepository, IWebHostEnvironment hostEnvironment)
        {
            _storyRepository = storyRepository;
            _hostEnvironment = hostEnvironment;
        }

        public async Task<List<Story>> GetActiveStoriesForProfile(int profileId)
        {
            List<Story> storiesForProfile = new List<Story>();
            foreach(Story story in await GetAll())
            {
                if (story.PublisherId == profileId &&
                    story.PublishingDate < DateTime.Now &&
                    story.PublishingDate > DateTime.Now.AddHours(-24))
                {
                    storiesForProfile.Add(story);
                }
            }
            return storiesForProfile;
        }

        public async Task<Story> GetById(string id)
        {
            return await _storyRepository.GetById(id);
        }

        public async Task<IEnumerable<Story>> GetAll()
        {
            return await _storyRepository.GetAll();
        }

        public async Task<Story> Insert(Story entity)
        {
            entity.ImageName = await SaveImage(entity.ImageFile);
            entity.PublishingDate = DateTime.Now;
            return await _storyRepository.Insert(entity);
        }

        public async Task<Story> Update(Story entity)
        {
            await _storyRepository.Update(entity);
            return entity;
        }

        public async Task Delete(string id)
        {
            await _storyRepository.Delete(id);
        }

        public async Task<List<StoryProfile>> GetAllStoryProfiles()
        {
            var result = await _storyRepository.GetAggregatedCollection();
            return result;
        }

        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
