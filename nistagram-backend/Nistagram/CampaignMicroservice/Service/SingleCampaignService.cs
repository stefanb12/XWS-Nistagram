using CampaignMicroservice.Model;
using CampaignMicroservice.Model.Enum;
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
        private IProfileService _profileService;

        public SingleCampaignService(ISingleCampaignRepository singleCampaignRepository, IProfileService profileService)
        {
            _singleCampaignRepository = singleCampaignRepository;
            _profileService = profileService;
        }

        public async Task<List<SingleCampaign>> GetSingleCampaignsForAgent(int agentId)
        {
            List<SingleCampaign> singleCampaigns = new List<SingleCampaign>();
            foreach (SingleCampaign singleCampaign in await GetAll())
            {
                if (singleCampaign.AgentId == agentId && !singleCampaign.Deleted)
                {
                    singleCampaigns.Add(singleCampaign);
                }
            }
            return singleCampaigns;
        }

        public async Task<List<SingleCampaign>> GetSingleCampaignsForProfile(int profileId)
        {
            List<SingleCampaign> singleCampaigns = new List<SingleCampaign>();

            Profile profile = await _profileService.GetByOriginalId(profileId);
            foreach (ProfileFollowing profileFollowing in profile.Following)
            {
                if (profileFollowing.Following.UserRole == UserRole.Agent)
                {
                    singleCampaigns.AddRange(GetCampaignAfterDefinedTime(await GetSingleCampaignsForAgent(profileFollowing.FollowingId)));
                }

                foreach (ProfileFollowing pf in profileFollowing.Following.Following)
                {
                    if (pf.Following.UserRole == UserRole.Agent && profileFollowing.FollowingId != pf.FollowingId)
                    {
                        singleCampaigns.AddRange(GetCampaignAfterDefinedTime(await GetSingleCampaignsForAgent(pf.FollowingId)));
                    }
                }
            }

            if (!singleCampaigns.Any())
            {
                IEnumerable<SingleCampaign> campaigns = await GetAll();
                singleCampaigns.AddRange(GetCampaignAfterDefinedTime(campaigns.ToList()));
            }

            return singleCampaigns;
        }

        private List<SingleCampaign> GetCampaignAfterDefinedTime(List<SingleCampaign> campaigns)
        {
            List<SingleCampaign> result = new List<SingleCampaign>();
            foreach (SingleCampaign singleCampaign in campaigns)
            {
                //if (singleCampaign.BroadcastTime.TimeOfDay.CompareTo(DateTime.Now.TimeOfDay) <= 0 && singleCampaign.BroadcastTime.TimeOfDay.CompareTo(DateTime.Now.AddHours(2).TimeOfDay) <= 0)
                if (DateTime.Now.TimeOfDay.CompareTo(singleCampaign.BroadcastTime.TimeOfDay) >= 0 && DateTime.Now.TimeOfDay.CompareTo(singleCampaign.BroadcastTime.AddHours(2).TimeOfDay) <= 0)
                {
                    result.Add(singleCampaign);
                }
            }
            return result;
        }   

        public async Task<SingleCampaign> DeleteSingleCampaign(int campaignId)
        {
            SingleCampaign campaign = await _singleCampaignRepository.GetById(campaignId);
            campaign.Deleted = true;
            await _singleCampaignRepository.Update(campaign);
            return campaign;
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
