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
        public string PublisherImageSrc { get; set; }
        public string PublisherUsername { get; set; }
        public int PublisherOriginalId { get; set; }
        public bool Deleted { get; set; }

        public StoryDto()
        {
        }
    }
}
