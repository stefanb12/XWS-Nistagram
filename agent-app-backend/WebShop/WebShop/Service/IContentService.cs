using System.Threading.Tasks;
using WebShop.Model;

namespace WebShop.Service
{
    public interface IContentService : IService<Content>
    {
        Task DeleteContentByProductIdIfExists(int productId);
    }
}
