using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Dto
{
    public class ProfileStoriesDto
    {
        public string Username { get; set; }
        public int OriginalId { get; set; }
        public string ImageSrc { get; set; }
        public List<StoryDto> Stories { get; set; }

        public ProfileStoriesDto()
        {
        }
    }
}
