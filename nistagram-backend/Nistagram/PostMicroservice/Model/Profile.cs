using Microsoft.AspNetCore.Http;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace PostMicroservice.Model
{
    public class Profile : User
    {
        public bool IsPrivate { get; set; }
        public int OriginalId { get; set; }
        public string ImageName { get; set; }
        public List<int> Following { get; set; }
        [BsonIgnore]
        public IFormFile ImageFile { get; set; }
        [BsonIgnore]
        public string ImageSrc { get; set; }

        public Profile() : base()
        {
        }
    }
}
