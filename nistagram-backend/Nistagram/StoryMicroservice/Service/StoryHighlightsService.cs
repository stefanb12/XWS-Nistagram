using StoryMicroservice.Model;
using StoryMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Service
{
    public class StoryHighlightsService : IStoryHighlightsService
    {
        private IStoryHighlightsRepository _storyHighlightsRepository;

        public StoryHighlightsService(IStoryHighlightsRepository storyHighlightsRepository)
        {
            _storyHighlightsRepository = storyHighlightsRepository;
        }

        public async Task<List<StoryHighlight>> GetStoryHighlightsForProfile(int profileId)
        {
            List<StoryHighlight> storyHighlightsForProfile = new List<StoryHighlight>(); 
            foreach(StoryHighlight storyHighlight in await GetAll())
            {
                if(storyHighlight.PublisherId == profileId)
                {
                    storyHighlightsForProfile.Add(storyHighlight);
                }
            }
            return storyHighlightsForProfile;
        }

        public async Task<StoryHighlight> GetById(string id)
        {
            return await _storyHighlightsRepository.GetById(id);
        }

        public async Task<IEnumerable<StoryHighlight>> GetAll()
        {
            return await _storyHighlightsRepository.GetAll();
        }

        public async Task<StoryHighlight> Insert(StoryHighlight entity)
        {
            return await _storyHighlightsRepository.Insert(entity);
        }

        public async Task<StoryHighlight> Update(StoryHighlight entity)
        {
            await _storyHighlightsRepository.Update(entity);
            return entity;
        }

        public async Task Delete(string id)
        {
            await _storyHighlightsRepository.Delete(id);
        }

    }
}
