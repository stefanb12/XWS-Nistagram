using StoryMicroservice.Dto;
using StoryMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Mapper
{
    public class StoryHighlightMapper
    {
        public static StoryHighlight StoryHighlightDtoToStoryHighlight(StoryHighlightDto dto)
        {
            StoryHighlight storyHighlight = new StoryHighlight();
            storyHighlight.Name = dto.Name;
            storyHighlight.PublisherId = dto.PublisherId;
            return storyHighlight;
        }

        public static StoryHighlightDto StoryHighlightToStoryHighlightDto(StoryHighlight storyHighlight)
        {
            StoryHighlightDto dto = new StoryHighlightDto();
            dto.Id = storyHighlight.Id;
            dto.Name = storyHighlight.Name;
            dto.PublisherId = storyHighlight.PublisherId;
            List<StoryDto> storiesDto = new List<StoryDto>();
            foreach(Story story in storyHighlight.Stories)
            {
                storiesDto.Add(new StoryDto()
                {
                    PublishingDate = story.PublishingDate,
                    ImageSrc = String.Format("http://localhost:55996/{0}", story.ImageName)
                }); ;
            }
            dto.Stories = storiesDto;
            return dto;
        }
    }
}
