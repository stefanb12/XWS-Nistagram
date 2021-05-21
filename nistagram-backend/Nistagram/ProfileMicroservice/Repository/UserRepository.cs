using ProfileMicroservice.Database;
using ProfileMicroservice.Model;

namespace ProfileMicroservice.Repository
{
    public class UserRepository : MySqlRepository<User>, IUserRepository
    {
        public UserRepository(ProfileDbContext context)
               : base(context)
        {
        }
    }
}
