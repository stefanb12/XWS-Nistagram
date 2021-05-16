using ProfileMicroservice.Model;
using ProfileMicroservice.Repository;
using System.Collections.Generic;

namespace ProfileMicroservice.Service
{
    public class UserService : IUserService
    {
        public IUserRepository UserRepository;

        public UserService(IUserRepository userRepository)
        {
            UserRepository = userRepository;
        }

        public IEnumerable<User> GetAll()
        {
            return UserRepository.GetAll();
        }

        public User GetById(int id)
        {
            return UserRepository.GetById(id);
        }

        public User Insert(User entity)
        {
            return UserRepository.Insert(entity);
        }

        public User Update(User entity)
        {
            UserRepository.Update(entity);
            return entity;
        }

        public void Delete(User entity)
        {
            User u = GetById(entity.Id);
            UserRepository.Delete(u);
        }
    }
}
