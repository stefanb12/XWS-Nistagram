using NotificationMicroservice.Model;
using NotificationMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Service
{
    public class ProfileService : IProfileService
    {
        private IProfileRepository _profileRepository;

        public ProfileService(IProfileRepository profileRepository)
        {
            _profileRepository = profileRepository;
        }

        public async Task<Profile> GetByOriginalId(int id)
        {
            var profiles =  await _profileRepository.GetAll();
            return profiles.FirstOrDefault(p => p.OriginalId == id);
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
