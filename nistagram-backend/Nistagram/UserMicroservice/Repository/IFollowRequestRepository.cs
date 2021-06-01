﻿using ProfileMicroservice.Model;
using ProfileMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Repository
{
    public interface IFollowRequestRepository : IRepository<FollowRequest>
    {
    }
}
