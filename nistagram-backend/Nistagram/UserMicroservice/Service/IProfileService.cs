using Microsoft.AspNetCore.Http;
using ProfileMicroservice.Model;
using ProfileMicroservice.Model.Enum;
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
        Task<Profile> UpdateWithImage(Profile profile, IFormFile imageFile);
        public bool DoesUsernameExist(string username, IEnumerable<Profile> profiles);
        Task<Profile> SetProfileCategory(int profileId, UserCategory userCategory);
        Task<List<Profile>> GetMutedProfiles(int id);
        Task<List<Profile>> GetBlockedProfiles(int id);
        Task<ProfileMutedProfile> MuteProfile(int profileId, int id);
        Task<ProfileMutedProfile> UnmuteProfile(int profileId, int id);
        Task<ProfileBlockedProfile> BlockProfile(int profileId, int id);
        Task<ProfileBlockedProfile> UnBlockProfile(int profileId, int id);
        Task<List<Profile>> GetCloseFriends(int id);
        Task<ProfileCloseFriend> AddCloseFriend(int profileId, int id);
        Task<ProfileCloseFriend> RemoveCloseFriend(int profileId, int id);
        Task<List<Profile>> GetNotificationProfiles(int id);
        Task<ProfileNotificationProfile> AddNotificationProfile(int profileId, int id);
        Task<ProfileNotificationProfile> RemoveNotificationProfile(int profileId, int id);
        Task<ProfileSettings> GetProfileSettingsById(int id);
        Task<ProfileSettings> UpdateProfileSettings(ProfileSettings entity, int profileId);
        Task<Profile> ActivateAgentProfile(int agentProfileId);
    }
}
