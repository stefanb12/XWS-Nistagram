using System;

namespace CampaignMicroservice.Model
{
    public class SingleCampaign : Campaign
    {
        public DateTime BroadcastTime { get; set; }

        public SingleCampaign()
        {
        }
    }
}
