using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserMicroservice.Dto;

namespace UserMicroservice.Mapper
{
    public class FollowRequestMapper
    {
        public static FollowRequest FollowRequestDtoToFollowRequest(FollowRequestDto dto)
        {
            FollowRequest followRequest = new FollowRequest();
            followRequest.Accepted = false;
            followRequest.Processed = false;
            followRequest.SenderId = dto.SenderId;
            followRequest.ReceiverId = dto.ReceiverId;
            return followRequest;
        }

        public static FollowRequestDto FollowRequestToFollowRequestDto(FollowRequest followRequest)
        {
            FollowRequestDto dto = new FollowRequestDto();
            dto.Accepted = followRequest.Accepted;
            dto.Processed = followRequest.Processed;
            dto.SenderId = followRequest.SenderId;
            dto.ReceiverId = followRequest.ReceiverId;
            return dto;
        }
    }
}
