using MongoDB.Driver;
using StoryMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Repository
{
    public interface IProfileRepository : IRepository<Profile>
    {
        public Task<List<ProfileStories>> GetProfileStoryAggregatedCollection(IMongoCollection<Story> storyCollection);
    }
}
