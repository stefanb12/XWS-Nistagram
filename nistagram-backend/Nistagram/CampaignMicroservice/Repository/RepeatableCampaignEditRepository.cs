using CampaignMicroservice.Database;
using CampaignMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Repository
{
    public class RepeatableCampaignEditRepository : MySqlRepository<RepeatableCampaignEdit>, IRepeatableCampaignEditRepository
    {
        public RepeatableCampaignEditRepository(CampaignDbContext context)
               : base(context)
        {
        }
    }
}
