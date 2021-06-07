using StoryMicroservice.Dto;
using StoryMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Mapper
{
    public class ProfileStoriesMapper
    {
        public static ProfileStoriesDto ProfileStoriesToProfileStoriesDto(ProfileStories profileStories)
        {
            ProfileStoriesDto dto = new ProfileStoriesDto();

            dto.OriginalId = profileStories.OriginalId;
            dto.Username = profileStories.Username;
            dto.ImageSrc = String.Format("http://localhost:55988/{0}", profileStories.ImageName);
            dto.Stories = new List<StoryDto>();
            foreach(Story s in profileStories.GetActiveStories())
            {
                dto.Stories.Add(StoryMapper.StoryToStoryDto(s));
            }
            return dto;
        }
    }
}
