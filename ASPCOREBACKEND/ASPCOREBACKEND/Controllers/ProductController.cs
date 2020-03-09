using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Application;
using Application.Models;
using ASPCOREBACKEND.Controllers.Dtos;
using AutoMapper;
using EnityFramework;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
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
            var brandId = 0;
            if(context.Brand.Any( brand => brand.Name == productDtos.BrandName)) {
                var brand = await context.Brand.FirstAsync(brand => brand.Name == productDtos.BrandName);
                brandId = brand.Id;
            }
            else
            {
                var brand = new Brand();
                brand.Name = productDtos.Name;
                await context.Brand.AddAsync(brand);
                await context.SaveChangesAsync();
                brand = await context.Brand.FirstAsync(brand => brand.Name == productDtos.BrandName);
                brandId = brand.Id;
            }
            var product = mapper.Map<Product>(productDtos);
            product.BrandId = brandId;
            await context.Product.AddAsync(product);
            context.Database.OpenConnection();
            await context.SaveChangesAsync();
            var stock = new Stock();
            stock.Quantity = productDtos.Quantity;
            product = context.Product.First(product => product.ImageUrl == productDtos.ImageUrl);
            stock.ProductId = product.Id;
            await context.Stock.AddAsync(stock);
            await context.SaveChangesAsync();
            return Ok();
        }
        [HttpGet("GetAll")]
        public List<ProductDto>GetAll()
        {
            var command = "exec GetAllProduct";
            return ConvertToList(Connection(command));
        }
        [HttpGet("carousel")]
        public async Task<ActionResult<List<ProductDto>>> GetProductForCarousel()
        {
            var command = "exec GetCarousel";
            return  ConvertToList(Connection(command));
        }
        [HttpGet("Display")]
        public async Task<ActionResult<List<ProductDto>>> GetProductDisplay()
        {
            var command = "exec GetDisplay";
            return ConvertToList(Connection(command)); 

        }
        [HttpGet("Categories/{categories}")]
        public async Task<ActionResult<List<ProductDto>>> GetProductCategory(string categories)
        {
            var command = "exec GetProductCategory @Categories=" + categories;
            return ConvertToList(Connection(command));
        }
        private List<ProductDto> ConvertToList(DataTable dt)
        {
            var convertedList = new List<ProductDto>();
                foreach (var dataRow in dt.Select())
                {
                    convertedList.Add(Mapping.CreateItemFromRow<ProductDto>(dataRow));
                }
                Console.WriteLine();
            return convertedList;
        }
        private DataTable Connection(string commandText)
        {
            using (var command = context.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = commandText;
                context.Database.OpenConnection();
                using (var result = command.ExecuteReader())
                {
                    var dt = new DataTable();
                    dt.Load(result);
                    var productDtos = ConvertToList(dt);
                    return dt;
                }
            }
        }
    }
}