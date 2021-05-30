using ProfileMicroservice.Database;
using ProfileMicroservice.Model;
using ProfileMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Repository
{
    public class FollowRequestRepository : MySqlRepository<FollowRequest>, IFollowRequestRepository
    {
        public FollowRequestRepository(UserDbContext context)
               : base(context)
        {
        }
    }
}
