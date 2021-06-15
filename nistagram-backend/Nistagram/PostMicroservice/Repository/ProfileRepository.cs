using PostMicroservice.Database;
using PostMicroservice.Model;

namespace PostMicroservice.Repository
{
    public class ProfileRepository : MySqlRepository<Profile>, IProfileRepository
    {
        public ProfileRepository(PostDbContext context)
               : base(context)
        {
        }
    }
}
