using CampaignMicroservice.Model;
using CampaignMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Service
{
    public class CampaignRequestService : ICampaignRequestService
    {
        private ICampaignRequestRepository _campaignRequestRepository;

        public CampaignRequestService(ICampaignRequestRepository campaignRequestRepository)
        {
            _campaignRequestRepository = campaignRequestRepository;
        }

        public async Task<List<CampaignRequest>> GetCampaignRequestsForCampaign(int campaignId)
        {
            var campaignRequsests = await _campaignRequestRepository.GetAll();
            return campaignRequsests.Where(cr => cr.CampaignId == campaignId).ToList();
        }

        public async Task<CampaignRequest> AcceptCampaignRequest(int campaignId, int influencerId)
        {
            foreach (CampaignRequest campaignRequest in await GetAll())
            {
                if(campaignRequest.CampaignId == campaignId && campaignRequest.InfluencerId == influencerId)
                {
                    campaignRequest.Processed = true;
                    campaignRequest.Accepted = true;
                    return await Update(campaignRequest);
                }
            }
            return null;
        }

        public async Task<CampaignRequest> RejectCampaignRequest(int campaignId, int influencerId)
        {
            foreach (CampaignRequest campaignRequest in await GetAll())
            {
                if (campaignRequest.CampaignId == campaignId && campaignRequest.InfluencerId == influencerId)
                {
                    campaignRequest.Processed = true;
                    campaignRequest.Accepted = false;
                    return await Update(campaignRequest);
                }
            }
            return null;
        }

        public async Task<CampaignRequest> GetById(int id)
        {
            return await _campaignRequestRepository.GetById(id);
        }

        public async Task<IEnumerable<CampaignRequest>> GetAll()
        {
            return await _campaignRequestRepository.GetAll();
        }

        public async Task<CampaignRequest> Insert(CampaignRequest entity)
        {
            return await _campaignRequestRepository.Insert(entity);
        }

        public async Task<CampaignRequest> Update(CampaignRequest entity)
        {
            await _campaignRequestRepository.Update(entity);
            return entity;
        }

        public async Task Delete(CampaignRequest entity)
        {
            await _campaignRequestRepository.Delete(entity);
        }
    }
}
