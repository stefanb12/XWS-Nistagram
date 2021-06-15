using PostMicroservice.Database;
using PostMicroservice.Model;

namespace PostMicroservice.Repository
{
    public class PostRepository : MySqlRepository<Post>, IPostRepository
    {
        public PostRepository(PostDbContext context)
               : base(context)
        {
        }
    }
}
