using CampaignMicroservice.Model;
using System.Threading.Tasks;

namespace CampaignMicroservice.Service
{
    public interface IProfileService : IService<Profile>
    {
        Task<Profile> GetAgentByUsername(string username);
        Task<Profile> GetByOriginalId(int id);
    }
}
