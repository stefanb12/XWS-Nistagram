using CampaignMicroservice.Database;
using CampaignMicroservice.Model;

namespace CampaignMicroservice.Repository
{
    public class CampaignRepository : MySqlRepository<Campaign>, ICampaignRepository
    {
        public CampaignRepository(CampaignDbContext context)
               : base(context)
        {
        }
    }
}
