using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Model
{
    public class ProfileStories : User
    {
        public bool IsPrivate { get; set; }
        public int OriginalId { get; set; }
        public List<Story> Stories { get; set; }
        public string ImageName { get; set; }
        public IFormFile ImageFile { get; set; }
        public string ImageSrc { get; set; }

        public ProfileStories() : base()
        {
        }
    }
}
