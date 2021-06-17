using InappropriateContentMicroservice.Model;
using System.Threading.Tasks;

namespace InappropriateContentMicroservice.Service
{
    public interface IInappropriateContentService : IService<InappropriateContent>
    {
        Task<bool> DoesInappropriateContentExist(InappropriateContent inappropriateContent, string storyId);
    }
}
