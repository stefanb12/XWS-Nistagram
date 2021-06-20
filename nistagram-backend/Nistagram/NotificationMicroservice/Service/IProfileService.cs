using NotificationMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Service
{
    public interface IProfileService : IService<Profile>
    {
        Task<Profile> GetByOriginalId(int id);
    }
}
