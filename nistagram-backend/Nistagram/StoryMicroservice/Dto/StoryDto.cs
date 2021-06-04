using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Dto
{
    public class StoryDto
    {
        public string Id { get; set; }
        public bool ForCloseFriends { get; set; }
        public DateTime PublishingDate { get; set; }
        public string ImageName { get; set; }
        public string ImageSrc { get; set; }

        public StoryDto()
        {
        }
    }
}
