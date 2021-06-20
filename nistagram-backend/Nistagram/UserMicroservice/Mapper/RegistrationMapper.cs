using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserMicroservice.Dto;

namespace UserMicroservice.Mapper
{
    public class RegistrationMapper
    {
        public static Profile RegistrationDtoToProfile(RegistrationDto dto)
        {
            Profile profile = new Profile();
            profile.Username = dto.Username;
            profile.Password = dto.Password;
            profile.FullName = dto.FullName;
            profile.Email = dto.Email;
            profile.Gender = dto.Gender;
            profile.UserRole = dto.UserRole;
            profile.Website = dto.Website;
            if (profile.UserRole == Model.Enum.UserRole.Agent)
            {
                profile.Deactivated = true;
            }
            profile.ProfileSettings = new ProfileSettings();
            return profile;
        }
    }
}
