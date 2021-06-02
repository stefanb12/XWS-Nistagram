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
    }
}
