using ProfileMicroservice.Database;
using ProfileMicroservice.Model;

namespace ProfileMicroservice.Repository
{
    public class UserRepository : MySqlRepository<User>, IUserRepository
    {
        public UserRepository(UserDbContext context)
               : base(context)
        {
        }
    }
}
