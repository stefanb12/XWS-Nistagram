using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebShop.Model
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int AvailableBalance { get; set; }
        public bool Deleted { get; set; }
        public virtual List<Content> Contents { get; set; }

        public Product()
        {
        }
    }
}
