using CampaignMicroservice.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CampaignMicroservice.Service
{
    public interface ISingleCampaignService : IService<SingleCampaign>
    {
        Task<List<SingleCampaign>> GetSingleCampaignsForAgent(int agentId);
        Task<SingleCampaign> DeleteSingleCampaign(int campaignId);
        Task<List<SingleCampaign>> GetSingleCampaignsForProfile(int profileId);
    }
}

