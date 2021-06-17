using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserMicroservice.Dto;

namespace UserMicroservice.Mapper
{
    public class ProfileVerificationRequestMapper
    {
        public static ProfileVerificationRequest ProfileVerificationRequestDtoToProfileVerificationRequest(ProfileVerificationRequestDto dto)
        {
            ProfileVerificationRequest profileVerificationRequest = new ProfileVerificationRequest();
            profileVerificationRequest.FirstName = dto.FirstName;
            profileVerificationRequest.LastName = dto.LastName;
            profileVerificationRequest.Category = dto.Category;
            profileVerificationRequest.ImageFile = dto.ImageFile;
            profileVerificationRequest.Processed = false;
            profileVerificationRequest.Accepted = false;
            profileVerificationRequest.ProfileId = dto.ProfileId;
            return profileVerificationRequest;
        }
    }
}
