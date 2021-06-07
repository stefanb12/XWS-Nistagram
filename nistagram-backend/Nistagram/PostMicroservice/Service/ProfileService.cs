using PostMicroservice.Model;
using PostMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Service
{
    public class ProfileService : IProfileService
    {
        private IProfileRepository _profileRepository;

        public ProfileService(IProfileRepository profileRepository)
        {
            _profileRepository = profileRepository;
        }

        public async Task<List<Profile>> GetAllPublicProfiles()
        {
            IEnumerable<Profile> publicProfiles = await GetAll();
            return publicProfiles.Where(pf => pf.IsPrivate == false).ToList();
        }

        public async Task<Profile> GetProfileByOriginalId(int originalId)
        {
            IEnumerable<Profile> profiles = await GetAll();
            return profiles.Where(p => p.OriginalId == originalId).FirstOrDefault();
        }

        public async Task<Profile> GetById(string id)
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
            profile.IsPrivate = entity.IsPrivate;
            profile.Following = entity.Following;
            profile.ImageName = entity.ImageName;
            return profile;
        }

        public async Task Delete(String id)
        {
            await _profileRepository.Delete(id);
        }
    }
}
