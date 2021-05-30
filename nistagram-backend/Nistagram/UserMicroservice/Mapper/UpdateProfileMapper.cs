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
        public static Profile ProfileDtoToProfile(Profile profile, ProfileDto dto)
        {
            //Profile profile = new Profile();
            //profile.Id = dto.Id;
            profile.Username = dto.Username;
            profile.Biography = dto.Biography;
            profile.Website = dto.Website;
            //profile.Password = dto.Password;
            profile.FullName = dto.FullName;
            profile.Email = dto.Email;
            profile.MobilePhone = dto.MobilePhone;
            profile.DateOfBirth = dto.DateOfBirth;
            profile.Gender = dto.Gender;
            return profile;
        }

        public static ProfileDto ProfileToProfileDto(Profile profile)
        {
            ProfileDto dto = new ProfileDto();
            dto.Username = profile.Username;
            dto.Biography = profile.Biography;
            dto.Website = profile.Website;
            dto.Password = profile.Password;
            dto.FullName = profile.FullName;
            dto.Email = profile.Email;
            dto.MobilePhone = profile.MobilePhone;
            dto.DateOfBirth = profile.DateOfBirth;
            dto.Gender = profile.Gender;

            return dto;
        }
    }
}
