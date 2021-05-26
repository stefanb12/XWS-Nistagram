using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserMicroservice.Dto;

namespace UserMicroservice.Mapper
{
    public class ProfileMapper
    {
        public static Profile ProfileDtoToProfile(ProfileDto dto)
        {
            Profile profile = new Profile();
            return profile;
        }

        public static ProfileDto ProfileToProfileDto(Profile profile)
        {
            ProfileDto dto = new ProfileDto();
            dto.Username = profile.Username;
            dto.Name = profile.Name;

            return dto;
        }
    }
}
