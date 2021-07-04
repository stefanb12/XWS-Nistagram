using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebShop.Model
{
    public class Content
    {
        public int Id { get; set; }
        public string ImageName { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

        public Content() { }
    }
}
