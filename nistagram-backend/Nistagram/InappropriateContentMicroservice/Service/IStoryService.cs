using InappropriateContentMicroservice.Model;
using System.Threading.Tasks;

namespace InappropriateContentMicroservice.Service
{
    public interface IStoryService : IService<Story>
    {
        Task<Story> GetByOriginalId(string originalId);
    }
}
