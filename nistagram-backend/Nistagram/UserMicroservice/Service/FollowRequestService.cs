using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserMicroservice.Repository;

namespace UserMicroservice.Service
{
    public class FollowRequestService : IFollowRequestService
    {
        private IFollowRequestRepository _followRequestRepository;

        public FollowRequestService(IFollowRequestRepository followRequestRepository)
        {
            _followRequestRepository = followRequestRepository;
        }

        public async Task<FollowRequest> FindFollowRequest(int receiverId, int senderId)
        {
            IEnumerable<FollowRequest> followRequests = await GetAll();
            FollowRequest followRequest = followRequests.Where(fr => fr.ReceiverId == receiverId && fr.SenderId == senderId).SingleOrDefault();
            return followRequest;
        }

        public async Task<FollowRequest> GetById(int id)
        {
            return await _followRequestRepository.GetById(id);
        }

        public async Task<IEnumerable<FollowRequest>> GetAll()
        {
            return await _followRequestRepository.GetAll();
        }

        public async Task<FollowRequest> Insert(FollowRequest entity)
        {
            FollowRequest followRequest = await FindFollowRequest(entity.ReceiverId, entity.SenderId);
            if(followRequest != null)
            {
                return null;
            }
            return await _followRequestRepository.Insert(entity);
        }

        public async Task<FollowRequest> Update(FollowRequest entity)
        {
            await _followRequestRepository.Update(entity);
            return entity;
        }

        public async Task Delete(FollowRequest entity)
        {
            FollowRequest followRequest = await FindFollowRequest(entity.ReceiverId, entity.SenderId);
            await _followRequestRepository.Delete(followRequest);
        }
    }
}
