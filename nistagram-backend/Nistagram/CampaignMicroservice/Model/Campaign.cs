using System.Collections.Generic;

namespace CampaignMicroservice.Model
{
    public class Campaign
    {
        public int Id { get; set; }
        public List<Profile> TargetGroup { get; set; }
        public int NumberOfComments { get; set; }
        public int NumberOfLikes { get; set; }
        public int NumberOfDislikes { get; set; }
        public int NumberOfCampaignViews { get; set; }
        public int NumberOfCampaignClicks { get; set; }
        public Agent Agent { get; set; }
        public List<Commercial> Commercial { get; set; }
        public Post Post { get; set; }
        public Story Story { get; set; }

        public Campaign()
        {
        }
    }
}
