using ProfileMicroservice.Model;
using ProfileMicroservice.Service;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace UserMicroservice.Service
{
    public interface IProfileService : IService<Profile>
    {
        Task<User> Authenticate(string username, string password, byte[] secretKey);
        Task<List<Profile>> GetFollowers(int id);
        Task<List<Profile>> GetFollowingProfiles(int id);
    }
}
