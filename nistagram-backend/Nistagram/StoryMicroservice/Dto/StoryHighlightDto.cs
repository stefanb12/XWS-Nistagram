using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Dto
{
    public class StoryHighlightDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int PublisherId { get; set; }
        public List<string> StoriesIds { get; set; }
        public List<StoryDto> Stories { get; set; }

        public StoryHighlightDto()
        {
        }
    }
}
