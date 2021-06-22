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

        public async Task<Profile> GetById(int id)
        {
            Profile profile = await _profileRepository.GetById(id);
            if (profile.Deactivated)
            {
                profile = null;
            }
            return profile;
        }

        public async Task<IEnumerable<Profile>> GetAll()
        {
            List<Profile> profiles = new List<Profile>();
            foreach (Profile profile in await _profileRepository.GetAll())
            {
                if (!profile.Deactivated)
                {
                    profiles.Add(profile);
                }
            }
            return profiles;
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
            profile.Deactivated = entity.Deactivated;
            profile.ImageName = entity.ImageName;
            profile.Following.Clear();
            profile.Following = entity.Following;
            profile.MutedProfiles.Clear();
            profile.MutedProfiles = entity.MutedProfiles;
            profile.BlockedProfiles.Clear();
            profile.BlockedProfiles = entity.BlockedProfiles;
            return profile;
        }

        public async Task Delete(int id)
        {
            Profile profile = await _profileRepository.GetById(id);
            await _profileRepository.Delete(profile);
        }
    }
}
