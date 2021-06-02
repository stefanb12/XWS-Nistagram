using Microsoft.AspNetCore.Http;
using StoryMicroservice.Dto;
using StoryMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Mapper
{
    public class StoryMapper
    {
        public static List<Story> StoryDtoToStories(InsertStoryDto dto)
        {
            List<Story> stories = new List<Story>();

            foreach (IFormFile image in dto.ImageFiles)
            {
                Story story = new Story();
                story.ForCloseFriends = dto.ForCloseFriends;
                story.ImageFile = image;
                story.Publisher = new Profile();
                story.Publisher.OriginalId = dto.Publisher.Id;
                story.Publisher.Username = dto.Publisher.Username;

                stories.Add(story);
            }

            return stories;
        }
    }
}
