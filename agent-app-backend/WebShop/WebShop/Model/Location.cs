using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebShop.Model
{
    public class Location
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        public Location()
        {
        }
    }
}
