using CampaignMicroservice.Model;
using CampaignMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Service
{
    public class RepeatableCampaignEditService : IRepeatableCampaignEditService
    {
        private IRepeatableCampaignEditRepository _repeatableCampaignEditRepository;

        public RepeatableCampaignEditService(IRepeatableCampaignEditRepository repeatableCampaignRepository)
        {
            _repeatableCampaignEditRepository = repeatableCampaignRepository;
        }

        public async Task<RepeatableCampaignEdit> GetById(int id)
        {
            return await _repeatableCampaignEditRepository.GetById(id);
        }

        public async Task<IEnumerable<RepeatableCampaignEdit>> GetAll()
        {
            return await _repeatableCampaignEditRepository.GetAll();
        }

        public async Task<RepeatableCampaignEdit> Insert(RepeatableCampaignEdit entity)
        {
            var campaignEdits = await _repeatableCampaignEditRepository.GetAll();
            RepeatableCampaignEdit campaignEdit = campaignEdits.FirstOrDefault(ce => ce.CampaignId == entity.CampaignId);
            if (campaignEdit != null)
            {
                campaignEdit.StartDate = entity.StartDate;
                campaignEdit.EndDate = entity.EndDate;
                campaignEdit.NumberOfRepeats = entity.NumberOfRepeats;
                campaignEdit.ModificationDate = DateTime.Now;
                return await Update(campaignEdit);
            }
            return await _repeatableCampaignEditRepository.Insert(entity);
        }

        public async Task<RepeatableCampaignEdit> GetRepeatableCampaignEditByCampaignId(int campaignId)
        {
            var campaignEdits = await _repeatableCampaignEditRepository.GetAll();
            return campaignEdits.FirstOrDefault(ce => ce.CampaignId == campaignId);
        }

        public async Task<RepeatableCampaignEdit> Update(RepeatableCampaignEdit entity)
        {
            await _repeatableCampaignEditRepository.Update(entity);
            return entity;
        }

        public async Task Delete(RepeatableCampaignEdit entity)
        {
            await _repeatableCampaignEditRepository.Delete(entity);
        }
    }
}
