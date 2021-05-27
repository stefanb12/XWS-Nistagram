using PostMicroservice.Database;
using PostMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
