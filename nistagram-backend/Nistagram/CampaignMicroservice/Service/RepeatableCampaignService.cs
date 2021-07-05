using CampaignMicroservice.Model;
using CampaignMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Service
{
    public class RepeatableCampaignService : IRepeatableCampaignService
    {
        private IRepeatableCampaignRepository _repeatableCampaignRepository;

        public RepeatableCampaignService(IRepeatableCampaignRepository repeatableCampaignRepository)
        {
            _repeatableCampaignRepository = repeatableCampaignRepository;
        }

        public async Task<List<RepeatableCampaign>> GetRepeatableCampaignsForAgent(int agentId)
        {
            List<RepeatableCampaign> repeatableCampaigns = new List<RepeatableCampaign>();
            foreach (RepeatableCampaign repeatableCampaign in await GetAll())
            {
                if (repeatableCampaign.AgentId == agentId && !repeatableCampaign.Deleted)
                {
                    repeatableCampaigns.Add(repeatableCampaign);
                }
            }
            return repeatableCampaigns;
        }

        public async Task<RepeatableCampaign> DeleteRepetableCampaign(int campaignId)
        {
            RepeatableCampaign campaign = await _repeatableCampaignRepository.GetById(campaignId);
            campaign.Deleted = true;
            await _repeatableCampaignRepository.Update(campaign);
            return campaign;
        }

        public async Task<RepeatableCampaign> GetById(int id)
        {
            return await _repeatableCampaignRepository.GetById(id);
        }

        public async Task<IEnumerable<RepeatableCampaign>> GetAll()
        {
            return await _repeatableCampaignRepository.GetAll();
        }

        public async Task<RepeatableCampaign> Insert(RepeatableCampaign entity)
        {
            return await _repeatableCampaignRepository.Insert(entity);
        }

        public async Task<RepeatableCampaign> Update(RepeatableCampaign entity)
        {
            await _repeatableCampaignRepository.Update(entity);
            return entity;
        }

        public async Task Delete(RepeatableCampaign entity)
        {
            await _repeatableCampaignRepository.Delete(entity);
        }
    }
}
