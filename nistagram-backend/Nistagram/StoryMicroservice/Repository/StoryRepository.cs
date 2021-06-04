using MongoDB.Driver;
using StoryMicroservice.Database;
using StoryMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Repository
{
    public class StoryRepository : MongoDbRepository<Story>, IStoryRepository
    {
        public StoryRepository(IMongoDbContext context)
            : base(context)
        {
        }

        public Task<List<StoryProfile>> GetAggregatedCollection()
        {
            return _dbCollection.Aggregate()
                    .Lookup<Story, Profile,  StoryProfile>(
                       _db.GetCollection<Profile>("Profile"),
                       x => x.PublisherId,
                       y => y.OriginalId,
                       z => z.Publisher
                     ).ToListAsync();
        }
    }
}
