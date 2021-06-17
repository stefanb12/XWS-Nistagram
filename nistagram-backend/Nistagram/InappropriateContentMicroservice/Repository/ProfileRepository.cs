using InappropriateContentMicroservice.Database;
using InappropriateContentMicroservice.Model;

namespace InappropriateContentMicroservice.Repository
{
    public class ProfileRepository : MySqlRepository<Profile>, IProfileRepository
    {
        public ProfileRepository(InappropriateContentDbContext context)
               : base(context)
        {
        }
    }
}

