using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Application;
using Application.Models;
using ASPCOREBACKEND.Controllers.Dtos;
using ASPCOREBACKEND.Data;
using AutoMapper;
using AutoMapper.Configuration;
using EnityFramework;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ASPCOREBACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationContext context;
        private readonly IMapper mapper;
        
        public ProductController(ApplicationContext applicationContext, IMapper mapper
                                 )
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
            return ConvertToList(Connection(command)).Select(prod => mapper.Map<ProductDto>(prod)).ToList();
        }
        [HttpGet("carousel")]
        public async Task<ActionResult<List<ProductDto>>> GetProductForCarousel()
        {
            var command = "exec GetCarousel";
            return ConvertToList(Connection(command)).Select(prod => mapper.Map<ProductDto>(prod)).ToList();
        }
        [HttpGet("Display")]
        public async Task<ActionResult<List<ProductDto>>> GetProductDisplay()
        {
            var command = "exec GetDisplay";
            return ConvertToList(Connection(command)).Select(prod => mapper.Map<ProductDto>(prod)).ToList();

        }
        [HttpPost("Categories")]
        public async Task<ActionResult<List<ProductDto>>> GetProductCategory([FromBody]CategoriesDTO categoryInput)
        {

            var command = "exec GetProductCategory @Categories=" + (int)Enum.Parse(typeof(Categories), categoryInput.CategoriesName.ToUpper());
            return ConvertToList(Connection(command)).Select(prod => mapper.Map<ProductDto>(prod)).ToList();
        }
        [NonAction]
        private List<Product> ConvertToList(DataTable datatable)
        {
            var convertedList = new List<Product>();
            foreach (var dataRow in datatable.Select())
            {
               convertedList.Add(Mapping.CreateItemFromRow<Product>(dataRow));
            }
              
            return convertedList;
        }
        [NonAction]
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