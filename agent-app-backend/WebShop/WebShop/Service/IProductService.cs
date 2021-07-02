using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Model;

namespace WebShop.Service
{
    public interface IProductService : IService<Product>
    {
        Task<List<Product>> GetAllNotIncludingDeletedProducts();
    }
}
