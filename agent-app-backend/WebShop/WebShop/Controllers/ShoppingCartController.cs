using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Model;
using WebShop.Service;

namespace WebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        private readonly IShoppingCartService _shoppingCartService;
        private readonly IProductService _productService;

        public ShoppingCartController(IShoppingCartService shoppingCartService, IProductService productService)
        {
            _shoppingCartService = shoppingCartService;
            _productService = productService;
        }

        [HttpPost]
        public async Task<IActionResult> GetAll(ShoppingCart shoppingCart)
        {
            ShoppingCart newShoppingCart = await _shoppingCartService.Insert(shoppingCart);
            foreach(ItemToPurchase itemToPurchase in newShoppingCart.ItemsToPurchase) {
                Product product = await _productService.GetById(itemToPurchase.ProductId);
                product.AvailableBalance = product.AvailableBalance - itemToPurchase.Quantity;
                await _productService.Update(product);
            }

            return Ok();
        }
    }
}
