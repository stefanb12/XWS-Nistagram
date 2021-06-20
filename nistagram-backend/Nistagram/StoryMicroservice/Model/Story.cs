using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace StoryMicroservice.Model
{
    public class Story : Document
    {
        public bool ForCloseFriends { get; set; }
        public DateTime PublishingDate { get; set; }
        public int PublisherId { get; set; }
        [BsonIgnore]
        public Profile Publisher { get; set; }
        public string ImageName { get; set; }
        [BsonIgnore]
        public IFormFile ImageFile { get; set; }
        [BsonIgnore]
        public string ImageSrc { get; set; }
        public bool Deleted { get; set; }

        public Story()
        {
            Id = ObjectId.GenerateNewId().ToString();
        }
    }
}
