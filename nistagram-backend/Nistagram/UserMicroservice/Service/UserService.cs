using ProfileMicroservice.Model;
using ProfileMicroservice.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProfileMicroservice.Service
{
    public class UserService : IUserService
    {
        public IUserRepository UserRepository;

        public UserService(IUserRepository userRepository)
        {
            UserRepository = userRepository;
        }

        public async Task<User> GetById(int id)
        {
            return await UserRepository.GetById(id);
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await UserRepository.GetAll();
        }

        public async Task<User> Insert(User entity)
        {
            return await UserRepository.Insert(entity);
        }

        public async Task<User> Update(User entity)
        {
            await UserRepository.Update(entity);
            return entity;
        }

        public async Task Delete(User entity)
        {
            await UserRepository.Delete(entity);
        }
    }
}
