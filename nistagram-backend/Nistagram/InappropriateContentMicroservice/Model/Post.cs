using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace InappropriateContentMicroservice.Model
{
    public class Post
    {
        public int Id { get; set; }
        public int OriginalId { get; set; }
        public string ImageName { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }

        public Post()
        {
        }
    }
}
