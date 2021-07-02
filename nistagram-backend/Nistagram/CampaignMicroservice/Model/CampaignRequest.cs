namespace CampaignMicroservice.Model
{
    public class CampaignRequest
    {
        public int Id { get; set; }
        public bool Accepted { get; set; }
        public bool Processed { get; set; }
        public int CampaignId { get; set; }
        public virtual Campaign Campaign { get; set; }
        public int InfluencerId { get; set; }
        public virtual Profile Influencer { get; set; }

        public CampaignRequest()
        {
        }
    }
}
