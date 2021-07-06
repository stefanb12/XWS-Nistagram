using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Dto
{
    public class EditCampaignDto
    {
        public int Id { get; set; }
        public bool IsSingleCampaign { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int NumberOfRepeats { get; set; }

        public EditCampaignDto()
        {
        }
    }
}
