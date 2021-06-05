using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserMicroservice.Dto;

namespace UserMicroservice.Mapper
{
    public class UpdateProfileMapper
    {
        public static Profile ProfileDtoToProfile(Profile profile, UpdateDto dto)
        {
            profile.Username = dto.Username;
            profile.Biography = dto.Biography;
            profile.Website = dto.Website;
            profile.FullName = dto.FullName;
            profile.Email = dto.Email;
            profile.MobilePhone = dto.MobilePhone;
            profile.DateOfBirth = dto.DateOfBirth;
            profile.Gender = dto.Gender;
            return profile;
        }

        public static UpdateDto ProfileToProfileDto(Profile profile)
        {
            UpdateDto dto = new UpdateDto();
            dto.Id = profile.Id;
            dto.Username = profile.Username;
            dto.Biography = profile.Biography;
            dto.Website = profile.Website;
            dto.Password = profile.Password;
            dto.FullName = profile.FullName;
            dto.Email = profile.Email;
            dto.MobilePhone = profile.MobilePhone;
            dto.DateOfBirth = profile.DateOfBirth;
            dto.Gender = profile.Gender;
            dto.ImageSrc = profile.ImageSrc;

            return dto;
        }
    }
}
