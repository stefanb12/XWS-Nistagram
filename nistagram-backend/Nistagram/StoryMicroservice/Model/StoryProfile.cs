using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Model
{
    public class StoryProfile : Document
    {
        public bool Visible { get; set; }
        public bool ForCloseFriends { get; set; }
        public DateTime PublishingDate { get; set; }
        public int PublisherId { get; set; }
        public List<Profile> Publisher { get; set; }
        public string ImageName { get; set; }
        [BsonIgnore]
        public IFormFile ImageFile { get; set; }
        [BsonIgnore]
        public string ImageSrc { get; set; }

        public StoryProfile()
        {
            Id = ObjectId.GenerateNewId().ToString();
        }
    }
}
