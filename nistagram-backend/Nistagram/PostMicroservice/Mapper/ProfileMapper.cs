using PostMicroservice.Dto;
using PostMicroservice.Model;

namespace PostMicroservice.Mapper
{
    public class ProfileMapper
    {
        public static Profile ProfileDtoToProfile(UpdatePostDto dto)
        {
            Profile profile = new Profile();
            profile.OriginalId = dto.Publisher.Id;
            profile.Username = dto.Publisher.Username;
            profile.ImageName = dto.Publisher.ImageName;
            return profile;
        }
    }
}
