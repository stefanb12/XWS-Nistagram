using ProfileMicroservice.Model;
using System.Threading.Tasks;

namespace ProfileMicroservice.Service
{
    public interface IUserService : IService<User>
    {
        Task<User> Authenticate(string username, string password, byte[] secretKey);
    }
}
