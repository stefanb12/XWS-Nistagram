using CampaignMicroservice.Model;
using CampaignMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Service
{
    public class CampaignService : ICampaignService
    {
        private ICampaignRepository _campaignRepository;

        public CampaignService(ICampaignRepository campaignRepository)
        {
            _campaignRepository = campaignRepository;
        }

        public async Task<Campaign> GetById(int id)
        {
            return await _campaignRepository.GetById(id);
        }

        public async Task<IEnumerable<Campaign>> GetAll()
        {
            return await _campaignRepository.GetAll();
        }

        public async Task<Campaign> Insert(Campaign entity)
        {
            return await _campaignRepository.Insert(entity);
        }

        public async Task<Campaign> Update(Campaign entity)
        {
            await _campaignRepository.Update(entity);
            return entity;
        }

        public async Task Delete(Campaign entity)
        {
            await _campaignRepository.Delete(entity);
        }
    }
}
