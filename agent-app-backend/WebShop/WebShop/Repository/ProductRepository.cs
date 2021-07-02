using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Database;
using WebShop.Model;

namespace WebShop.Repository
{
    public class ProductRepository : MySqlRepository<Product>, IProductRepository
    {
        public ProductRepository(WebShopDbContext context)
               : base(context)
        {
        }
    }
}
