using CampaignMicroservice.Database;
using CampaignMicroservice.Model;

namespace CampaignMicroservice.Repository
{
    public class CommercialRepository : MySqlRepository<Commercial>, ICommercialRepository
    {
        public CommercialRepository(CampaignDbContext context)
               : base(context)
        {
        }
    }
}
