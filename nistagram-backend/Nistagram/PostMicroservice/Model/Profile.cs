using Microsoft.AspNetCore.Http;
using MongoDB.Bson.Serialization.Attributes;

namespace PostMicroservice.Model
{
    public class Profile : User
    {
        public bool IsPrivate { get; set; }
        public int OriginalId { get; set; }
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
