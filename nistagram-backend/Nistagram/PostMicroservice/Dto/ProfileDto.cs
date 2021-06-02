using Microsoft.AspNetCore.Http;
using MongoDB.Bson.Serialization.Attributes;

namespace PostMicroservice.Dto
{
    public class ProfileDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string ImageName { get; set; }
        [BsonIgnore]
        public IFormFile ImageFile { get; set; }
        [BsonIgnore]
        public string ImageSrc { get; set; }

        public ProfileDto() {}
    }
}
