using CampaignMicroservice.Database;
using CampaignMicroservice.Model;

namespace CampaignMicroservice.Repository
{
    public class SingleCampaignRepository : MySqlRepository<SingleCampaign>, ISingleCampaignRepository
    {
        public SingleCampaignRepository(CampaignDbContext context)
               : base(context)
        {
        }
    }
}

