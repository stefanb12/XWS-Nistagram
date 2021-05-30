using Microsoft.AspNetCore.Http;
using MongoDB.Bson.Serialization.Attributes;

namespace PostMicroservice.Model
{
    public class Content
    {
        public int Id { get; set; }
        public string ImageName { get; set; }
        [BsonIgnore]
        public IFormFile ImageFile { get; set; }
        [BsonIgnore]
        public string ImageSrc { get; set; }
        public int PostId { get; set; }
        public virtual Post Post { get; set; }

        public Content() {}
    }
}
