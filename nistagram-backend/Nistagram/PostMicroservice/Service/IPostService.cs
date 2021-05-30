using Microsoft.AspNetCore.Http;
using PostMicroservice.Model;
using System.Threading.Tasks;

namespace PostMicroservice.Service
{
    public interface IPostService : IService<Post>
    {
        Task<string> SaveImage(IFormFile imageFile);
    }
}
