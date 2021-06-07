using StoryMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Service
{
    public interface IProfileService : IService<Profile>
    {
        Task<Profile> GetProfileByOriginalId(int id);
        Task<List<ProfileStories>> GetProfileStories();
        Task<List<ProfileStories>> GetFollowingProfilesActiveStories(int profileId);
    }
}
