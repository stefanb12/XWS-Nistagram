using ProfileMicroservice.Model;
using ProfileMicroservice.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Service
{
    public interface IFollowRequestService : IService<FollowRequest>
    {
        Task<FollowRequest> FindFollowRequest(int receiverId, int senderId);
    }
}
