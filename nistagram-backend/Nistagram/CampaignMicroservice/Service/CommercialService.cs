using CampaignMicroservice.Model;
using CampaignMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CampaignMicroservice.Service
{
    public class CommercialService : ICommercialService
    {
        private ICommercialRepository _commercialRepository;

        public CommercialService(ICommercialRepository commercialRepository)
        {
            _commercialRepository = commercialRepository;
        }

        public async Task<List<Commercial>> GetCommercialsForAgent(int agentId)
        {
            List<Commercial> commercialsForAgent = new List<Commercial>();
            foreach(Commercial commercial in await GetAll())
            {
                if(commercial.AgentId == agentId)
                {
                    commercial.ImageSrc = String.Format("http://localhost:56000/{0}", commercial.ImageName);
                    commercialsForAgent.Add(commercial);
                }
            }
            return commercialsForAgent;
        }

        public async Task<Commercial> GetById(int id)
        {
            return await _commercialRepository.GetById(id);
        }

        public async Task<IEnumerable<Commercial>> GetAll()
        {
            return await _commercialRepository.GetAll();
        }

        public async Task<Commercial> Insert(Commercial entity)
        {
            return await _commercialRepository.Insert(entity);
        }

        public async Task<Commercial> Update(Commercial entity)
        {
            await _commercialRepository.Update(entity);
            return entity;
        }

        public async Task Delete(Commercial entity)
        {
            await _commercialRepository.Delete(entity);
        }
    }
}
