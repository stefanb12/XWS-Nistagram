using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace PostMicroservice.Dto
{
    public class ProfileDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string ImageName { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }

        public ProfileDto() {}
    }
}
