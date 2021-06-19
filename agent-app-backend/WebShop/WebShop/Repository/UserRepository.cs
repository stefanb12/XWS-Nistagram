using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Database;
using WebShop.Model;

namespace WebShop.Repository
{
    public class UserRepository : MySqlRepository<User>, IUserRepository
    {
        public UserRepository(WebShopDbContext context)
               : base(context)
        {
        }
    }
}
