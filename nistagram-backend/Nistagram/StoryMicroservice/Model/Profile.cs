using Microsoft.AspNetCore.Http;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace StoryMicroservice.Model
{
    public class Profile : User
    {
        public bool IsPrivate { get; set; }
        public int OriginalId { get; set; }
        public List<int> Following { get; set; }
        public List<int> CloseFriends { get; set; }
        public string ImageName { get; set; }
        [BsonIgnore]
        public IFormFile ImageFile { get; set; }
        [BsonIgnore]
        public string ImageSrc { get; set; }

        public Profile() : base()
        {
        }
    }
}
