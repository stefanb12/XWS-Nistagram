namespace CampaignMicroservice.Model
{
    public class Commercial
    {
        public long Id { get; set; }
        public string WebsiteLink { get; set; }
        public Content Content { get; set; }

        public Commercial()
        {
        }
    }
}
