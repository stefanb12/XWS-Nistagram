namespace CampaignMicroservice.Model
{
    public class CampaignRequest
    {
        public int Id { get; set; }
        public bool Accepted { get; set; }
        public bool Processed { get; set; }
        public Campaign Campaign { get; set; }
        public Profile Influencer { get; set; }

        public CampaignRequest()
        {
        }
    }
}
