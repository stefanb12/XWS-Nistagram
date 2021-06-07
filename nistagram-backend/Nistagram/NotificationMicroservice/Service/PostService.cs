using NotificationMicroservice.Model;
using NotificationMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Service
{
    public class PostService : IPostService
    {
        private IPostRepository _postRepository;

        public PostService(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public async Task<Post> GetByOriginalId(string originalId)
        {
            IEnumerable<Post> posts = await GetAll();
            return posts.Where(p => p.OriginalId.Equals(originalId)).SingleOrDefault();
        }

        public async Task<Post> GetById(int id)
        {
            return await _postRepository.GetById(id);
        }

        public async Task<IEnumerable<Post>> GetAll()
        {
            return await _postRepository.GetAll();
        }

        public async Task<Post> Insert(Post entity)
        {
            return await _postRepository.Insert(entity);
        }

        public async Task<Post> Update(Post entity)
        {
            await _postRepository.Update(entity);
            return entity;
        }

        public async Task Delete(Post entity)
        {
            await _postRepository.Delete(entity);
        }
    }
}
