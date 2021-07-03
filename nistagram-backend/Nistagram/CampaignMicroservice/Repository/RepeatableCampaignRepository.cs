using CampaignMicroservice.Database;
using CampaignMicroservice.Model;

namespace CampaignMicroservice.Repository
{
    public class RepeatableCampaignRepository : MySqlRepository<RepeatableCampaign>, IRepeatableCampaignRepository
    {
        public RepeatableCampaignRepository(CampaignDbContext context)
               : base(context)
        {
        }
    }
}
