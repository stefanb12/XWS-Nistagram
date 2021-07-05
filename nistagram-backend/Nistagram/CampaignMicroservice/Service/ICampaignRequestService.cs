using CampaignMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Service
{
    public interface ICampaignRequestService : IService<CampaignRequest>
    {
        public Task<List<CampaignRequest>> GetCampaignRequestsForCampaign(int campaignId);
        public Task<CampaignRequest> AcceptCampaignRequest(int campaignId, int influencerId);
        public Task<CampaignRequest> RejectCampaignRequest(int campaignId, int influencerId);
    }
}
