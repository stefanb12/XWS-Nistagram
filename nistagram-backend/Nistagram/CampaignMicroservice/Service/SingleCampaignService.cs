using CampaignMicroservice.Model;
using CampaignMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Service
{
    public class SingleCampaignService : ISingleCampaignService
    {
        private ISingleCampaignRepository _singleCampaignRepository;

        public SingleCampaignService(ISingleCampaignRepository singleCampaignRepository)
        {
            _singleCampaignRepository = singleCampaignRepository;
        }

        public async Task<List<SingleCampaign>> GetSingleCampaignsForAgent(int agentId)
        {
            List<SingleCampaign> singleCampaigns = new List<SingleCampaign>();
            foreach (SingleCampaign singleCampaign in await GetAll())
            {
                if (singleCampaign.AgentId == agentId)
                {
                    singleCampaigns.Add(singleCampaign);
                }
            }
            return singleCampaigns;
        }

        public async Task<SingleCampaign> GetById(int id)
        {
            return await _singleCampaignRepository.GetById(id);
        }

        public async Task<IEnumerable<SingleCampaign>> GetAll()
        {
            return await _singleCampaignRepository.GetAll();
        }

        public async Task<SingleCampaign> Insert(SingleCampaign entity)
        {
            return await _singleCampaignRepository.Insert(entity);
        }

        public async Task<SingleCampaign> Update(SingleCampaign entity)
        {
            await _singleCampaignRepository.Update(entity);
            return entity;
        }

        public async Task Delete(SingleCampaign entity)
        {
            await _singleCampaignRepository.Delete(entity);
        }
    }
}
