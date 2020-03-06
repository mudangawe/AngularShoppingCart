using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application;
using Application.Models;
using ASPCOREBACKEND.Controllers.Dtos;
using AutoMapper;
using EnityFramework;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ASPCOREBACKEND.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationContext context;
        private readonly IMapper mapper;
        public ProductController(ApplicationContext applicationContext, IMapper mapper)
        {
            this.context = applicationContext;
            this.mapper = mapper;
        }
        [HttpPost("Create")]
        public async Task<ActionResult> Create(ProductDto productDtos)
        {
            await context.Product.AddAsync(mapper.Map<Product>(productDtos));
            await context.SaveChangesAsync();
            var stock = new Stock();
            stock.Quantity = productDtos.Quantity;
            var product = context.Product.First(product => product.ImageUrl == productDtos.ImageUrl);
            stock.ProductId = product.Id;
            return Ok();
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<ProductDto>> GetAll()
        {

            return Ok();
              
        }
    }
}