namespace CampaignMicroservice.Model
{
    public class Commercial
    {
        public int Id { get; set; }
        public string WebsiteLink { get; set; }
        public Content Content { get; set; }

        public Commercial()
        {
        }
    }
}
