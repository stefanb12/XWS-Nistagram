using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using WebShop.Dto;
using WebShop.Model;

namespace WebShop.Mapper
{
    public class ProductMapper
    {
        public static Product ProductDtoToProduct(ProductDto dto)
        {
            Product product = new Product();

            product.Name = dto.Name;
            product.Price = dto.Price;
            product.Description = dto.Description;
            product.AvailableBalance = dto.AvailableBalance;
            product.Deleted = false;

            List<Content> contents = new List<Content>();
            foreach (IFormFile file in dto.ImageFiles)
            {
                Content content = new Content();
                content.ImageFile = file;
                contents.Add(content);
            }
            product.Contents = contents;

            return product;
        }

        public static ProductDto ProductToProductDto(Product product)
        {
            ProductDto dto = new ProductDto();

            dto.Name = product.Name;
            dto.Price = product.Price;
            dto.Description = product.Description;
            dto.AvailableBalance = product.AvailableBalance;
            dto.Deleted = product.Deleted;

            dto.ImagesSrc = new List<string>();
            for (int i = 0; i < product.Contents.Count; i++)
            {
                dto.ImagesSrc.Add(product.Contents[i].ImageSrc);
            }

            return dto;
        }
    }
}
