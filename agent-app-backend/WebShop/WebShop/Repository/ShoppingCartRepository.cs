using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Database;
using WebShop.Model;

namespace WebShop.Repository
{
    public class ShoppingCartRepository : MySqlRepository<ShoppingCart>, IShoppingCartRepository
    {
        public ShoppingCartRepository(WebShopDbContext context)
               : base(context)
        {
        }
    }
}
