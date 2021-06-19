using NotificationMicroservice.Model;
using System.Threading.Tasks;

namespace NotificationMicroservice.Service
{
    public interface IStoryService : IService<Story>
    {
        Task<Story> GetByOriginalId(string originalId);
    }
}
