﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using StoryMicroservice.Messaging;
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
        private IStoryCreatedMessageSender _storyCreatedSender;

        public StoryService(IStoryRepository storyRepository, IWebHostEnvironment hostEnvironment, IStoryCreatedMessageSender storyCreatedSender)
        {
            _storyRepository = storyRepository;
            _hostEnvironment = hostEnvironment;
            _storyCreatedSender = storyCreatedSender;
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

        public async Task<List<Story>> GetStoriesForProfile(int profileId)
        {
            List<Story> storiesForProfile = new List<Story>();
            foreach (Story story in await GetAll())
            {
                if (story.PublisherId == profileId)
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

            Story story = await _storyRepository.Insert(entity);
            _storyCreatedSender.SendCreatedStory(story);

            return story;
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

        public async Task SaveImageSrc(string imageSrc)
        {
            string staticFiles = Environment.GetEnvironmentVariable("STATIC_FILES") ?? "true";
            if (staticFiles == "false")
            {
                var filePath = imageSrc.Substring(23);
                var fileBytes = File.ReadAllBytes(filePath);
                var ms = new MemoryStream(fileBytes);
                var formFile = new FormFile(ms, 0, ms.Length, null, Path.GetFileName(filePath))
                {
                    Headers = new HeaderDictionary(),
                    ContentType = "image"
                };
                string imageName = new String(Path.GetFileNameWithoutExtension(filePath));
                imageName = imageName + Path.GetExtension(filePath);
                var imagePath = Path.Combine("wwwroot", imageName);
                using (var fileStream = new FileStream(imagePath, FileMode.Create))
                {
                    await formFile.CopyToAsync(fileStream);
                }
            }
        }
    }
}
