using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Model;

namespace WebShop.Service
{
    public interface IUserService : IService<User>
    {
        Task<User> Authenticate(string username, string password, byte[] secretKey);
    }
}
