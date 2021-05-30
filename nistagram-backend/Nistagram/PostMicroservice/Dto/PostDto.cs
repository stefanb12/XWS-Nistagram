﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace PostMicroservice.Dto
{
    public class PostDto
    {
        public string Id { get; set; }
        public List<string> Tags { get; set; }
        public string Description { get; set; }
        public DateTime PublishingDate { get; set; }
        public LocationDto Location { get; set; }
        public ProfileDto Publisher { get; set; }
        public List<IFormFile> ImageFiles { get; set; }

        public PostDto() {}
    }
}
