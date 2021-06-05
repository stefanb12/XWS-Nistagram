using MongoDB.Driver;
using StoryMicroservice.Database;
using StoryMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Repository
{
    public class ProfileRepository : MongoDbRepository<Profile>, IProfileRepository
    {
        public ProfileRepository(IMongoDbContext context) :
            base(context)
        {
        }

        public Task<List<ProfileStories>> GetProfileStoryAggregatedCollection(IMongoCollection<Story> storyCollection)
        {
            return _dbCollection.Aggregate()
                    .Lookup<Profile, Story, ProfileStories>(
                       storyCollection,
                       x => x.OriginalId,
                       y => y.PublisherId,
                       z => z.Stories
                     ).ToListAsync();
        }
    }
}
