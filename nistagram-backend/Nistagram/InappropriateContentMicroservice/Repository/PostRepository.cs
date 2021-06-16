using InappropriateContentMicroservice.Database;
using InappropriateContentMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InappropriateContentMicroservice.Repository
{
    public class PostRepository : MySqlRepository<Post>, IPostRepository
    {
        public PostRepository(InappropriateContentDbContext context)
               : base(context)
        {
        }
    }
}
