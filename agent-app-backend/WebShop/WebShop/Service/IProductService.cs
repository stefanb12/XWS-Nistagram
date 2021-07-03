using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebShop.Model;

namespace WebShop.Service
{
    public interface IProductService : IService<Product>
    {
        Task<List<Product>> GetAllNotIncludingDeletedProducts();
        Task<string> SaveImage(IFormFile imageFile);
        Task<Product> UpdateProduct(Product product);
    }
}
