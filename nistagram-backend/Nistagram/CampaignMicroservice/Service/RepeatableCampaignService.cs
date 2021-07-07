using CampaignMicroservice.Model;
using CampaignMicroservice.Model.Enum;
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
        private IRepeatableCampaignEditService _repeatableCampaignEditService;
        private IProfileService _profileService;

        public RepeatableCampaignService(IRepeatableCampaignRepository repeatableCampaignRepository, IRepeatableCampaignEditService repeatableCampaignEditService, IProfileService profileService)
        {
            _repeatableCampaignRepository = repeatableCampaignRepository;
            _repeatableCampaignEditService = repeatableCampaignEditService;
            _profileService = profileService;
        }

        public async Task<List<RepeatableCampaign>> GetRepeatableCampaignsForAgent(int agentId)
        {
            List<RepeatableCampaign> repeatableCampaigns = new List<RepeatableCampaign>();
            foreach (RepeatableCampaign repeatableCampaign in await GetAll())
            {
                if (repeatableCampaign.AgentId == agentId && !repeatableCampaign.Deleted)
                {
                    RepeatableCampaignEdit repeatableCampaignEdit =
                        await _repeatableCampaignEditService.GetRepeatableCampaignEditByCampaignId(repeatableCampaign.Id);
                    if (repeatableCampaignEdit != null)
                    {
                        CopyEditCampaignContentToCampaign(repeatableCampaign, repeatableCampaignEdit);
                        if (repeatableCampaignEdit.ModificationDate.AddHours(24) < DateTime.Now)
                        {
                            await Update(repeatableCampaign);
                            await _repeatableCampaignEditService.Delete(repeatableCampaignEdit);
                        }
                    }
                    repeatableCampaigns.Add(repeatableCampaign);
                }
            }
            return repeatableCampaigns;
        }

        public async Task<List<RepeatableCampaign>> GetRepeatableCampaignsForProfile(int profileId)
        {
            List<RepeatableCampaign> repeatableCampaigns = new List<RepeatableCampaign>();

            Profile profile = await _profileService.GetByOriginalId(profileId);
            foreach (ProfileFollowing profileFollowing in profile.Following)
            {
                if (profileFollowing.Following.UserRole == UserRole.Agent)
                {
                    repeatableCampaigns.AddRange(GetCampaignAfterDefinedTime(await GetRepeatableCampaignsForAgent(profileFollowing.FollowingId)));
                }

                foreach (ProfileFollowing pf in profileFollowing.Following.Following)
                {
                    if (pf.Following.UserRole == UserRole.Agent && profileFollowing.FollowingId != pf.FollowingId)
                    {
                        repeatableCampaigns.AddRange(GetCampaignAfterDefinedTime(await GetRepeatableCampaignsForAgent(pf.FollowingId)));
                    }
                }
            }

            if (!repeatableCampaigns.Any())
            {
                IEnumerable<RepeatableCampaign> campaigns = await GetAll();
                repeatableCampaigns.AddRange(GetCampaignAfterDefinedTime(campaigns.ToList()));
            }

            return repeatableCampaigns;
        }

        private List<RepeatableCampaign> GetCampaignAfterDefinedTime(List<RepeatableCampaign> campaigns)
        {
            List<RepeatableCampaign> result = new List<RepeatableCampaign>();
            foreach (RepeatableCampaign repeatableCampaign in campaigns)
            {
                if (repeatableCampaign.StartDate.CompareTo(DateTime.Now) <= 0 && repeatableCampaign.EndDate.CompareTo(DateTime.Now) >= 0)
                {
                    result.Add(repeatableCampaign);
                }
            }
            return result;
        }

        private void CopyEditCampaignContentToCampaign(RepeatableCampaign repeatableCampaign, 
            RepeatableCampaignEdit repeatableCampaignEdit)
        {
            repeatableCampaign.StartDate = repeatableCampaignEdit.StartDate;
            repeatableCampaign.EndDate = repeatableCampaignEdit.EndDate;
            repeatableCampaign.NumberOfRepeats = repeatableCampaignEdit.NumberOfRepeats;
        }

        public async Task<RepeatableCampaign> DeleteRepetableCampaign(int campaignId)
        {
            RepeatableCampaign campaign = await _repeatableCampaignRepository.GetById(campaignId);
            campaign.Deleted = true;
            await _repeatableCampaignRepository.Update(campaign);
            return campaign;
        }

        public async Task<RepeatableCampaign> EditRepetableCampaign(RepeatableCampaign campaign)
        {
            RepeatableCampaign entity = await _repeatableCampaignRepository.GetById(campaign.Id);
            entity.StartDate = campaign.StartDate;
            entity.EndDate = campaign.EndDate;
            entity.NumberOfRepeats = campaign.NumberOfRepeats;
            await _repeatableCampaignRepository.Update(entity);
            return entity;
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
