using ProfileMicroservice.Model;
using ProfileMicroservice.Service;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserMicroservice.Model;

namespace UserMicroservice.Service
{
    public interface IProfileService : IService<Profile>
    {
        Task<User> Authenticate(string username, string password, byte[] secretKey);
        Task<List<Profile>> GetFollowers(int id);
        Task<List<Profile>> GetFollowingProfiles(int id);
        Task<bool> DoesProfileFollowAnotherProfile(int profileId, int id);
        Task<ProfileFollower> FollowAnotherProfile(int profileId, int id);
        Task<ProfileFollower> UnfollowAnotherProfile(int profileId, int id);
    }
}
