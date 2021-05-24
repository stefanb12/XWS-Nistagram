using PostMicroservice.Database;
using PostMicroservice.Model;

namespace PostMicroservice.Repository
{
    public class LocationRepository : MongoDbRepository<Location>, ILocationRepository
    {
        public LocationRepository(IMongoDbContext context)
               : base(context)
        {
            _dbCollection = context.GetDatabase().GetCollection<Location>(typeof(Location).Name);
        }
    }
}
