using ProfileMicroservice.Database;
using ProfileMicroservice.Model;
using ProfileMicroservice.Repository;

namespace UserMicroservice.Repository
{
    public class ProfileRepository : MySqlRepository<Profile>, IProfileRepository
    {
        public ProfileRepository(UserDbContext context)
               : base(context)
        {
        }
    }
}
