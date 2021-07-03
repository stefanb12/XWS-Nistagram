using System.Collections.Generic;

namespace CampaignMicroservice.Model
{
    public class Campaign
    {
        public int Id { get; set; }
        /*public int NumberOfComments { get; set; }
        public int NumberOfLikes { get; set; }
        public int NumberOfDislikes { get; set; }
        public int NumberOfCampaignViews { get; set; }
        public int NumberOfCampaignClicks { get; set; }
        public virtual List<TargetGroupProfile> TargetGroup { get; set; }*/
        public bool IsPost { get; set; }
        public virtual List<CampaignCommercial> Commercials { get; set; } 
        public int AgentId { get; set; }
        public virtual Profile Agent { get; set; }
        public int PostId { get; set; }
        public string StoryId { get; set; }

        public Campaign()
        {
        }
    }
}
