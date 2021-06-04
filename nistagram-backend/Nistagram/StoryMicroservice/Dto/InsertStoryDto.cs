using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Dto
{
    public class InsertStoryDto
    {
        public int Id { get; set; }
        public bool ForCloseFriends { get; set; }
        public DateTime PublishingDate { get; set; }
        public ProfileDto Publisher { get; set; }
        public List<IFormFile> ImageFiles { get; set; }

    }
}
