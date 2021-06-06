using MongoDB.Driver;
using PostMicroservice.Database;
using PostMicroservice.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Repository
{
    public class PostRepository : MongoDbRepository<Post>, IPostRepository
    {
        public PostRepository(IMongoDbContext context)
               : base(context)
        {
        }
    }
}
