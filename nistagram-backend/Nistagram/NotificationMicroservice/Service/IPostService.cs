﻿using NotificationMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Service
{
    public interface IPostService : IService<Post>
    {
        Task<Post> GetByOriginalId(string originalId);
    }
}
