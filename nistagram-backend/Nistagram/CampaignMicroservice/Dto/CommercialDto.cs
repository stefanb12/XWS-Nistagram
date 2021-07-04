using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Dto
{
    public class CommercialDto
    {
        public int Id { get; set; }
        public string WebsiteLink { get; set; }
        public string ImageName { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }
        public int AgentId { get; set; } 
        public string APIToken { get; set; }

        public CommercialDto() { }
    }
}
