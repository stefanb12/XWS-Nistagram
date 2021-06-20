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
                story.PublisherId = dto.Publisher.Id;
                story.Publisher = new Profile();
                story.Publisher.OriginalId = dto.Publisher.Id;
                story.Publisher.Username = dto.Publisher.Username;

                stories.Add(story);
            }

            return stories;
        }

        public static StoryDto StoryToStoryDto(Story story)
        {
            StoryDto dto = new StoryDto();

            dto.Id = story.Id;
            dto.PublishingDate = story.PublishingDate;
            dto.ForCloseFriends = story.ForCloseFriends;
            dto.ImageName = story.ImageName;
            dto.ImageSrc = String.Format("http://localhost:55996/{0}", story.ImageName);

            if (story.Publisher != null)
            {
                dto.PublisherImageSrc = String.Format("http://localhost:55988/{0}", story.Publisher.ImageName);
                dto.PublisherUsername = story.Publisher.Username;
            }

            return dto;
        }
    }
}
