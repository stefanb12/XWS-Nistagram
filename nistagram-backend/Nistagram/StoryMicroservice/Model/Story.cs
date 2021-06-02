using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace StoryMicroservice.Model
{
    public class Story : Document
    {
        public bool Visible { get; set; }
        public bool ForCloseFriends { get; set; }
        public DateTime PublishingDate { get; set; }
        public Profile Publisher { get; set; }
        public string ImageName { get; set; }
        [BsonIgnore]
        public IFormFile ImageFile { get; set; }
        [BsonIgnore]
        public string ImageSrc { get; set; }

        public Story()
        {
            Id = ObjectId.GenerateNewId().ToString();
        }
    }
}
