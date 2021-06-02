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

        public ProfileService(IProfileRepository profileRepository)
        {
            _profileRepository = profileRepository;
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
    }
}
