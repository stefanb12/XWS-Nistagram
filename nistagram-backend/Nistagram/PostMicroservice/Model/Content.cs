using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace PostMicroservice.Model
{
    public class Content
    {
        public int Id { get; set; }
        public string WebsiteLink { get; set; }
        public string ImageName { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }
        public int PostId { get; set; }
        public virtual Post Post { get; set; }

        public Content() {}
    }
}
