using CampaignMicroservice.Database;
using CampaignMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Repository
{
    public class CampaignRequestRepository : MySqlRepository<CampaignRequest>, ICampaignRequestRepository
    {
        public CampaignRequestRepository(CampaignDbContext context)
               : base(context)
        {
        }
    }
}
