using PostMicroservice.Messaging;
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
        private IMuteProfileErrorMesssageSender _muteProfileErrorMesssageSender;

        public ProfileService(IProfileRepository profileRepository, IMuteProfileErrorMesssageSender muteProfileErrorMesssageSender)
        {
            _profileRepository = profileRepository;
            _muteProfileErrorMesssageSender = muteProfileErrorMesssageSender;
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
            bool muteError = false;
            var profiles = await GetAll();
            Profile profile = profiles.FirstOrDefault(p => p.OriginalId == entity.OriginalId);
            foreach (int mutedProfileId in entity.MutedProfilesIds)
            {
                if (await GetProfileByOriginalId(mutedProfileId) == null)
                {
                    _muteProfileErrorMesssageSender.SendMuteProfileError(entity.OriginalId, mutedProfileId);
                    muteError = true;
                }
            }
            return await _profileRepository.Update(UpdateProfileAttributes(profile, entity, muteError));
        }

        private Profile UpdateProfileAttributes(Profile profile, Profile entity, bool muteError)
        {
            profile.Username = entity.Username;
            profile.IsPrivate = entity.IsPrivate;
            profile.Deactivated = entity.Deactivated;
            profile.ImageName = entity.ImageName;
            profile.Following.Clear();
            profile.Following = entity.Following;
            if(!muteError)
            {
                profile.MutedProfiles.Clear();
                profile.MutedProfiles = entity.MutedProfiles;
            }
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
