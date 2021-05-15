using System;

namespace CampaignMicroservice.Model
{
    public class RepeatableCampaign : Campaign
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int NumberOfRepeats { get; set; }
        public DateTime LastModification { get; set; }

        public RepeatableCampaign()
        {
        }
    }
}
