using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Model;
using WebShop.Repository;

namespace WebShop.Service
{
    public class ProductService : IProductService
    {
        private IProductRepository _productRepository;
        private IContentService _contentService;

        public ProductService(IProductRepository productRepository, IContentService contentService)
        {
            _productRepository = productRepository;
            _contentService = contentService;
        }

        public async Task<Product> GetById(int id)
        {
            return await _productRepository.GetById(id);
        }

        public async Task<List<Product>> GetAllNotIncludingDeletedProducts()
        {
            List<Product> products = new List<Product>();
            foreach (Product product in await _productRepository.GetAll())
            {
                if (!product.Deleted)
                {
                    products.Add(product);
                }
            }
            return products;   
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
                foreach (Content content in entity.Contents)
                {
                    content.ImageName = await SaveImage(content.ImageFile);
                }
                return await _productRepository.Insert(entity);
            }
            return null;
        }

        public async Task<Product> UpdateProduct(Product product)
        {
            foreach (Product p in await GetAllNotIncludingDeletedProducts())
            {
                if (p.Name.Equals(product.Name))
                {
                    if (p.Id != product.Id)
                    {
                        return null;
                    }
                }
            }

            Product productForUpdate = await GetById(product.Id);
            if (productForUpdate == null)
            {
                return null;
            }

            productForUpdate.Name = product.Name;
            productForUpdate.Price = product.Price;
            productForUpdate.Description = product.Description;
            productForUpdate.AvailableBalance = product.AvailableBalance;
            
            if (product.Contents.Any())
            {
                foreach (Content content in product.Contents)
                {
                    content.ImageName = await SaveImage(content.ImageFile);
                    await _contentService.DeleteContentByProductIdIfExists(product.Id);
                    productForUpdate.Contents.Add(content);
                }
            }
            
            return await _productRepository.Update(productForUpdate);
        }

        public async Task<Product> Update(Product entity)
        {
            return await _productRepository.Update(entity);
        }

        public async Task Delete(Product entity)
        {
            await _productRepository.Delete(entity);
        }

        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine("wwwroot", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
