using ProfileMicroservice.Model;
using ProfileMicroservice.Model.Enum;
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

        public static ProfileVerificationRequestDto ProfileVerificationRequestToProfileVerificationRequestDto(ProfileVerificationRequest profileVerificationRequest)
        {
            ProfileVerificationRequestDto dto = new ProfileVerificationRequestDto();
            dto.Id = profileVerificationRequest.Id;
            dto.Username = profileVerificationRequest.Profile.Username;
            dto.FirstName = profileVerificationRequest.FirstName;
            dto.LastName = profileVerificationRequest.LastName;
            dto.CategoryName = Enum.GetName(typeof(UserCategory), profileVerificationRequest.Category);
            dto.ImageSrc = profileVerificationRequest.ImageSrc;
            dto.Accepted = profileVerificationRequest.Accepted;
            dto.Processed = profileVerificationRequest.Processed;
            return dto;
        }
    }
}
