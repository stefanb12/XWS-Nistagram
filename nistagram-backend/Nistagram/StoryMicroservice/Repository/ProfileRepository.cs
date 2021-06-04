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
    }
}
