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

namespace ASPCOREBACKEND.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationContext applicationContext;
        private readonly IMapper mapper;
        public ProductController(ApplicationContext applicationContext,IMapper mapper)
        {
            this.applicationContext = applicationContext;
            this.mapper = mapper;
        }
        [HttpGet]
        
        [HttpGet("{features}")]
        public IEnumerable<ProductDto> GetProducts(string features)
        {
            var products = applicationContext.Products.Where(product => product.Features == features).ToList();
            var personDto = new ProductDto[products.Count];
            StringExtensioncs convertToByte = new StringExtensioncs();
            int count = 0;
            foreach (Product pr in products)
            {
                personDto[count++] = mapper.Map<ProductDto>(pr);
            }

            return personDto;
        }
        [HttpPost("categories")]
        public IEnumerable<Product> GetProduct([FromBody] CategoriesDTO categoriesDTO)
        {
            if (categoriesDTO.BrandName == null && categoriesDTO.PriceLevel == 0)
            {
                return applicationContext.Products.Where(x => x.Categories == categoriesDTO.CategoriesName);
            }
            else if (categoriesDTO.CategoriesName != null && categoriesDTO.PriceLevel == 0)
            {
                return applicationContext.Products.Where(x => x.Categories == categoriesDTO.CategoriesName && 
                          x.Brand == categoriesDTO.BrandName);
            }
            else if (categoriesDTO.CategoriesName == null && categoriesDTO.PriceLevel != 0)
            {
                return applicationContext.Products.Where(x => x.Categories == categoriesDTO.CategoriesName &&
                         x.PriceLevel == categoriesDTO.PriceLevel);
            }
            else 
            {
                return applicationContext.Products.Where(x => x.Categories == categoriesDTO.CategoriesName &&
                            x.PriceLevel == categoriesDTO.PriceLevel && x.Brand == categoriesDTO.BrandName);
            }

        }
        [HttpPost]
         public bool  Post([FromBody] Product product)
         {
           return  SaveProductToDB(product);
         }
        private  bool SaveProductToDB(Product product)
        {
            product.ImageUrl =  SaveImageToUrl(product);
            product.DateModified = DateTime.Now;
           
            applicationContext.Products.Add(product);
            applicationContext.SaveChanges();
            return true;

        }
        private string SaveImageToUrl(Product product)
        {
            string filepath = @"../../front-end\src\assets\Images\" + product.Categories  +
                                 @"\" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + ".png";
            StringExtensioncs convertToByte = new StringExtensioncs();
            convertToByte.SaveImage(convertToByte.Base64ToImage(product.ImageUrl), filepath);
            return filepath.Replace(@"../../front-end\src\", "").Replace(@"\", @"/");
        }
        

    }
}