using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace CampaignMicroservice.Model
{
    public class Profile
    {
        public int Id { get; set; }
        public int OriginalId { get; set; }
        public string Username { get; set; }
        public string ImageName { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }

        public Profile()
        {
        }
    }
}
