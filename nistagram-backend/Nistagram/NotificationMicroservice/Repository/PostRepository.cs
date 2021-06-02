using NotificationMicroservice.Database;
using NotificationMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Repository
{
    public class PostRepository : MySqlRepository<Post>, IPostRepository
    {
        public PostRepository(NotificationDbContext context)
               : base(context)
        {
        }
    }
}
