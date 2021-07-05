using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Dto
{
    public class DeleteCampaignDto
    {
        public int Id { get; set; }
        public bool IsSingleCampaign { get; set; }
    }
}
