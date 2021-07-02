using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace CampaignMicroservice.Model
{
    public class Commercial
    {
        public int Id { get; set; }
        public string WebsiteLink { get; set; }
        public string ImageName { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }
        public int AgentId { get; set; }
        public virtual Profile Agent { get; set; }

        public Commercial()
        {
        }
    }
}
