using NotificationMicroservice.Database;
using NotificationMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Repository
{
    public class ProfileRepository : MySqlRepository<Profile>, IProfileRepository
    {
        public ProfileRepository(NotificationDbContext context)
               : base(context)
        {
        }
    }
}
