using CampaignMicroservice.Database;
using CampaignMicroservice.Model;

namespace CampaignMicroservice.Repository
{
    public class ProfileRepository : MySqlRepository<Profile>, IProfileRepository
    {
        public ProfileRepository(CampaignDbContext context)
               : base(context)
        {
        }
    }
}
