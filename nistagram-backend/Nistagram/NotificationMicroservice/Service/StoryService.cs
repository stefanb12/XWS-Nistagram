using NotificationMicroservice.Model;
using NotificationMicroservice.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NotificationMicroservice.Service
{
    public class StoryService : IStoryService
    {
        private IStoryRepository _storyRepository;

        public StoryService(IStoryRepository storyRepository)
        {
            _storyRepository = storyRepository;
        }

        public async Task<Story> GetByOriginalId(string originalId)
        {
            foreach (Story story in await GetAll())
            {
                if (story.OriginalId.Equals(originalId))
                {
                    return story;
                }
            }
            return null;
        }

        public async Task<Story> GetById(int id)
        {
            return await _storyRepository.GetById(id);
        }

        public async Task<IEnumerable<Story>> GetAll()
        {
            return await _storyRepository.GetAll();
        }

        public async Task<Story> Insert(Story entity)
        {
            return await _storyRepository.Insert(entity);
        }

        public async Task<Story> Update(Story entity)
        {
            await _storyRepository.Update(entity);
            return entity;
        }

        public async Task Delete(Story entity)
        {
            await _storyRepository.Delete(entity);
        }
    }
}
