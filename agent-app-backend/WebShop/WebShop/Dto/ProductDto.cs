using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace WebShop.Dto
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int AvailableBalance { get; set; }
        public bool Deleted { get; set; }
        public List<IFormFile> ImageFiles { get; set; }
        public List<string> ImagesSrc { get; set; }

        public ProductDto() { }
    }
}
