using StoryMicroservice.Model;
using StoryMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Service
{
    public class ProfileService : IProfileService
    {
        private IProfileRepository _profileRepository;
        private IStoryRepository _storyRepository;

        public ProfileService(IProfileRepository profileRepository, IStoryRepository storyRepository)
        {
            _profileRepository = profileRepository;
            _storyRepository = storyRepository;
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
            Profile profile = await GetProfileByOriginalId(entity.OriginalId);
            return await _profileRepository.Update(UpdateProfileAttributes(profile, entity));
        }

        private Profile UpdateProfileAttributes(Profile profile, Profile entity)
        {
            profile.Username = entity.Username;
            profile.IsPrivate = entity.IsPrivate;
            profile.ImageName = entity.ImageName;
            profile.Following = entity.Following;
            profile.CloseFriends = entity.CloseFriends;
            profile.MutedProfiles = entity.MutedProfiles;
            return profile;
        }

        public async Task Delete(string id)
        {
            await _profileRepository.Delete(id);
        }

        public async Task<Profile> GetProfileByOriginalId(int id)
        {
            var allProfiles = await _profileRepository.GetAll();
            return allProfiles.FirstOrDefault(predicate => predicate.OriginalId == id);
        }

        public async Task<List<ProfileStories>> GetProfileStories()
        {
            var profileStories = await _profileRepository.GetProfileStoryAggregatedCollection(_storyRepository.GetCollection());
            List<ProfileStories> returnValue = new List<ProfileStories>();
            foreach(ProfileStories ps in profileStories)
            {
                if (ps.Stories.Count > 0)
                {
                    returnValue.Add(ps);
                }
            }
            return returnValue;
        }

        public async Task<List<ProfileStories>> GetFollowingProfilesActiveStories(int profileId)
        {
            var profileStories = await _profileRepository.GetProfileStoryAggregatedCollection(_storyRepository.GetCollection());
            List<ProfileStories> returnValue = new List<ProfileStories>();
            Profile profile = await GetProfileByOriginalId(profileId);
            foreach(ProfileStories ps in profileStories)
            {
                if (profile.IsFollowingAndNotMuted(ps.OriginalId) || ps.OriginalId == profileId)
                {
                    if (ps.OriginalId != profileId)
                    {
                        ps.Stories = FilterStoriesForCloseFriends(ps, profileId);
                    }
                    else
                    {
                        ps.Stories = ps.GetActiveStories();
                    }
                   
                    if (ps.Stories.Count > 0)
                    {
                        returnValue.Add(ps);
                    }  
                }
            }
            return returnValue;
        }

        public List<Story> FilterStoriesForCloseFriends(ProfileStories profileStories, int profileId)
        {
            List<Story> filteredStories = new List<Story>();
            foreach(Story s in profileStories.GetActiveStories())
            {
                if (s.ForCloseFriends && !profileStories.IsCloseFriend(profileId))
                {
                    continue;
                }
                filteredStories.Add(s);
            }
            return filteredStories;
        }
    }
}
