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
            await _profileRepository.Update(entity);
            return entity;
        }

        public async Task Delete(string id)
        {
            await _profileRepository.Delete(id);
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
    }
}
