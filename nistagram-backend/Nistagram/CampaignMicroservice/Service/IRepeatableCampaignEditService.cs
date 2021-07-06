using CampaignMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Service
{
    public interface IRepeatableCampaignEditService : IService<RepeatableCampaignEdit>
    {
        Task<RepeatableCampaignEdit> GetRepeatableCampaignEditByCampaignId(int campaignId);
    }
}
