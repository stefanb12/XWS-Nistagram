using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace NotificationMicroservice.Model
{
    public class Story
    {
        public int Id { get; set; }
        public string OriginalId { get; set; }
        public string ImageName { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }

        public Story()
        {
        }
    }
}
