using PostMicroservice.Database;
using PostMicroservice.Model;

namespace PostMicroservice.Repository
{
    public class ProfileRepository : MongoDbRepository<Profile>, IProfileRepository
    {
        public ProfileRepository(IMongoDbContext context)
               : base(context)
        {
        }
    }
}
