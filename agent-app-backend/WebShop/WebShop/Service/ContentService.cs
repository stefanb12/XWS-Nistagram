using System.Collections.Generic;
using System.Threading.Tasks;
using WebShop.Model;
using WebShop.Repository;

namespace WebShop.Service
{
    public class ContentService : IContentService
    {
        private IContentRepository _contentRepository;

        public ContentService(IContentRepository contentRepository)
        {
            _contentRepository = contentRepository;
        }

        public async Task DeleteContentByProductIdIfExists(int productId)
        {
            foreach (Content content in await GetAll())
            {
                if (content.ProductId == productId)
                {
                    await Delete(content);
                }
            }
        }

        public async Task<Content> GetById(int id)
        {
            return await _contentRepository.GetById(id);
        }

        public async Task<IEnumerable<Content>> GetAll()
        {
            return await _contentRepository.GetAll();
        }

        public async Task<Content> Insert(Content entity)
        {
            return await _contentRepository.Insert(entity);
        }

        public async Task<Content> Update(Content entity)
        {
            return await _contentRepository.Update(entity);
        }

        public async Task Delete(Content entity)
        {
            await _contentRepository.Delete(entity);
        }
    }
}
