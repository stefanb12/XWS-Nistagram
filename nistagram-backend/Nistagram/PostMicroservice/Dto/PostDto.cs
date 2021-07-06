using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace PostMicroservice.Dto
{
    public class PostDto
    {
        public int Id { get; set; }
        public List<string> Tags { get; set; }
        public string Description { get; set; }
        public DateTime PublishingDate { get; set; }
        public LocationDto Location { get; set; }
        public ProfileDto Publisher { get; set; }
        public List<CommentDto> Comments { get; set; }
        public List<IFormFile> ImageFiles { get; set; }
        public List<CommercialDto> ImagesSrc { get; set; }
        public List<ProfileDto> Dislikes { get; set; }
        public List<ProfileDto> Likes { get; set; }
        public List<ProfileDto> Favorites { get; set; }
        public bool Deleted { get; set; }
        public bool IsCommercial { get; set; }
        public string ImageSrc { get; set; }

        public PostDto()
        {
            IsCommercial = false;
        }
    }
}
