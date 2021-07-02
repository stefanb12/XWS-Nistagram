using CampaignMicroservice.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CampaignMicroservice.Service
{
    public interface ICommercialService : IService<Commercial>
    {
        Task<List<Commercial>> GetCommercialsForAgent(int agentId);
    }
}
