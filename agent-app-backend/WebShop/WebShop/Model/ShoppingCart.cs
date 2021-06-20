using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebShop.Model
{
    public class ShoppingCart
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public double Total { get; set; }
        public virtual List<ItemToPurchase> ItemsToPurchase { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }

    }
}
