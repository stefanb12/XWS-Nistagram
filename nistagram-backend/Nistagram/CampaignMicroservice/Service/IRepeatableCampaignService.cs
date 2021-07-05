using CampaignMicroservice.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CampaignMicroservice.Service
{
    public interface IRepeatableCampaignService : IService<RepeatableCampaign>
    {
        Task<List<RepeatableCampaign>> GetRepeatableCampaignsForAgent(int agentId);

        Task<RepeatableCampaign> DeleteRepetableCampaign(int campaignId);
    }
}
