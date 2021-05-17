using PostMicroservice.Model;
using PostMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Service
{
    public class PostService : IPostService
    {
        public IPostRepository PostRepository;

        public PostService(IPostRepository postRepository)
        {
            PostRepository = postRepository;
        }

        public async Task<Post> GetById(string id)
        {
            return await PostRepository.GetById(id);
        }

        public async Task<IEnumerable<Post>> GetAll()
        {
            return await PostRepository.GetAll();
        }

        public async Task<Post> Insert(Post entity)
        {
            return await PostRepository.Insert(entity);
        }

        public async Task<Post> Update(Post entity)
        {
            await PostRepository.Update(entity);
            return entity;
        }

        public async Task Delete(String id)
        {
            await PostRepository.Delete(id);
        }
    }
}
