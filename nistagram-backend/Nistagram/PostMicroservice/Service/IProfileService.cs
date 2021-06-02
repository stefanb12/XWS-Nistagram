using PostMicroservice.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PostMicroservice.Service
{
    public interface IProfileService : IService<Profile>
    {
        Task<List<Profile>> GetAllPublicProfiles();
    }
}
