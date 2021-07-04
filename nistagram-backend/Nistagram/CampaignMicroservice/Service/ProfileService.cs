using CampaignMicroservice.Model;
using CampaignMicroservice.Model.Enum;
using CampaignMicroservice.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Service
{
    public class ProfileService : IProfileService
    {
        private IProfileRepository _profileRepository;

        public ProfileService(IProfileRepository profileRepository)
        {
            _profileRepository = profileRepository;
        }

        public async Task<Profile> GetAgentByUsername(string username)
        {
            foreach(Profile profile in await GetAll())
            {
                if(profile.Username.Equals(username) && profile.UserRole == UserRole.Agent)
                {
                    return profile;
                }
            }
            return null;
        }

        public async Task<Profile> GetById(int id)
        {
            return await _profileRepository.GetById(id);
        }

        public async Task<IEnumerable<Profile>> GetAll()
        {
            return await _profileRepository.GetAll();
        }

        public async Task<Profile> Insert(Profile entity)
        {
            return await _profileRepository.Insert(entity);
        }

        public async Task<Profile> Update(Profile entity)
        {
            var profiles = await GetAll();
            Profile profile = profiles.FirstOrDefault(p => p.OriginalId == entity.OriginalId);
            return await _profileRepository.Update(UpdateProfileAttributes(profile, entity));
        }

        private Profile UpdateProfileAttributes(Profile profile, Profile entity)
        {
            profile.Username = entity.Username;
            profile.ImageName = entity.ImageName;
            return profile;
        }

        public async Task Delete(Profile entity)
        {
            await _profileRepository.Delete(entity);
        }
    }
}