﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Dto;
using WebShop.Mapper;
using WebShop.Model;
using WebShop.Service;

namespace WebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (await _productService.GetAllNotIncludingDeletedProducts() == null)
            {
                return NoContent();
            }

            return Ok(await _productService.GetAllNotIncludingDeletedProducts());
        }

        [HttpGet("includingDeleted")]
        public async Task<IActionResult> getAllIncludingDeletedProducts()
        {
            IEnumerable<Product> tempProducts = await _productService.GetAll();
            List<Product> products = tempProducts.ToList();

            if (products.Count == 0)
            {
                return NotFound();
            }

            List<ProductDto> dtos = new List<ProductDto>();
            foreach (Product product in products)
            {
                for (int i = 0; i < product.Contents.Count; i++)
                {
                    product.Contents[i].ImageSrc = String.Format("http://localhost:37424/{0}", product.Contents[i].ImageName);
                }
                dtos.Add(ProductMapper.ProductToProductDto(product));
            }

            return Ok(dtos);
        }
    }
}
