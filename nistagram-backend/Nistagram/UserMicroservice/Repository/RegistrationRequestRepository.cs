using ProfileMicroservice.Database;
using ProfileMicroservice.Model;
using ProfileMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Repository
{
    public class RegistrationRequestRepository : MySqlRepository<RegistrationRequest>, IRegistrationRequestRepository
    {
        public RegistrationRequestRepository(UserDbContext context)
               : base(context)
    {
    }
}
}
