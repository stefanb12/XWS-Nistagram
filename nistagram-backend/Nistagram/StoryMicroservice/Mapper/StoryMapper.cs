using Microsoft.AspNetCore.Http;
using StoryMicroservice.Dto;
using StoryMicroservice.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Mapper
{
    public class StoryMapper
    {
        public static List<Story> StoryDtoToStories(InsertStoryDto dto)
        {
            List<Story> stories = new List<Story>();

            if (dto.IsCommercial)
            {
                foreach (CommercialDto commercial in dto.Commercials)
                {
                    string staticFiles = Environment.GetEnvironmentVariable("STATIC_FILES") ?? "true";
                    string filePath = "";
                    if (staticFiles == "false")
                    {
                        filePath = commercial.ImageName;
                    }
                    else
                    {
                        filePath = Path.GetFullPath(commercial.ImageName).Replace("StoryMicroservice", "CampaignMicroservice\\wwwroot");
                    }
                    var fileBytes = File.ReadAllBytes(filePath);
                    var ms = new MemoryStream(fileBytes);
                    var formFile = new FormFile(ms, 0, ms.Length, null, Path.GetFileName(filePath))
                    {
                        Headers = new HeaderDictionary(),
                        ContentType = "image"
                    };
                    Story story = new Story
                    {
                        ForCloseFriends = dto.ForCloseFriends,
                        ImageFile = formFile,
                        WebsiteLink = commercial.WebsiteLink,
                        IsCommercial = true,
                        PublisherId = dto.Publisher.Id,
                        Publisher = new Profile
                        {
                            OriginalId = dto.Publisher.Id,
                            Username = dto.Publisher.Username
                        }
                    };
                    stories.Add(story);
                }
            }
            else 
            {
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
            }

            return stories;
        }

        public static StoryDto StoryToStoryDto(Story story)
        {
            StoryDto dto = new StoryDto();

            dto.Id = story.Id;
            dto.PublishingDate = story.PublishingDate;
            dto.ForCloseFriends = story.ForCloseFriends;
            dto.WebsiteLink = story.WebsiteLink;
            dto.IsCommercial = story.IsCommercial;
            dto.ImageName = story.ImageName;
            dto.ImageSrc = String.Format("http://localhost:55996/{0}", story.ImageName);

            if (story.Publisher != null)
            {
                dto.PublisherImageSrc = String.Format("http://localhost:55988/{0}", story.Publisher.ImageName);
                dto.PublisherUsername = story.Publisher.Username;
                dto.PublisherOriginalId = story.Publisher.OriginalId;
            }
            dto.Deleted = story.Deleted;

            return dto;
        }
    }
}
