using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Dto
{
    public class CampaignRequestDto
    {
        public int Id { get; set; }
        public bool Accepted { get; set; }
        public bool Processed { get; set; }
        public int CampaignId { get; set; }
        public int InfluencerId { get; set; }

        public CampaignRequestDto()
        {
        }
    }
}
