using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Model;
using WebShop.Repository;

namespace WebShop.Service
{
    public class ProductService : IProductService
    {
        private IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<Product> GetById(int id)
        {
            return await _productRepository.GetById(id);
        }

        public async Task<IEnumerable<Product>> GetAll()
        {
            return await _productRepository.GetAll();
        }

        public async Task<Product> Insert(Product entity)
        {
            IEnumerable<Product> products = await GetAll();
            if (!products.ToList().Any(u => u.Name.Equals(entity.Name)))
            {
                Product product = await _productRepository.Insert(entity);
                return product;
            }
            throw null;
        }

        public async Task<Product> Update(Product entity)
        {
            return await _productRepository.Update(entity);
        }

        public async Task Delete(Product entity)
        {
            await _productRepository.Delete(entity);
        }
    }
}
