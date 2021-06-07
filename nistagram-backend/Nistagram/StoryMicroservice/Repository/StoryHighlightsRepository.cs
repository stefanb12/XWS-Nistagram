using MongoDB.Driver;
using StoryMicroservice.Database;
using StoryMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Repository
{
    public class StoryHighlightsRepository : MongoDbRepository<StoryHighlight>, IStoryHighlightsRepository
    {
        public StoryHighlightsRepository(IMongoDbContext context) :
            base(context)
        {
        }
    }
}
