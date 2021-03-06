﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCOREBACKEND.Controllers.Dtos
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string BrandName { get; set; }
        public Double Price { get; set; }
        public string Category { get; set; }
        public string Destription { get; set; }
        public string ImageUrl { get; set; }
        public int Quantity { get; set; }
    }
}
