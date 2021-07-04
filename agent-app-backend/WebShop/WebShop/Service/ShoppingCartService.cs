using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Model;
using WebShop.Repository;

namespace WebShop.Service
{
    public class ShoppingCartService : IShoppingCartService
    {
        private IShoppingCartRepository _shoppingCartRepository;

        public ShoppingCartService(IShoppingCartRepository shoppingCartRepository)
        {
            _shoppingCartRepository = shoppingCartRepository;
        }

        public async Task<ShoppingCart> GetById(int id)
        {
            return await _shoppingCartRepository.GetById(id);
        }

        public async Task<IEnumerable<ShoppingCart>> GetAll()
        {
            return await _shoppingCartRepository.GetAll();
        }

        public async Task<ShoppingCart> Insert(ShoppingCart entity)
        {
            ShoppingCart shoppingCart = await _shoppingCartRepository.Insert(entity);
            return shoppingCart;
        }

        public async Task<ShoppingCart> Update(ShoppingCart entity)
        {
            return await _shoppingCartRepository.Update(entity);
        }

        public async Task Delete(ShoppingCart entity)
        {
            await _shoppingCartRepository.Delete(entity);
        }
    }
}
