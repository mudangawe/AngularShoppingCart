using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCOREBACKEND.Controllers.Dtos
{
    public class ProductDto
    {
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Price { get; set; }
        public string Categories { get; set; }
        public string Destription { get; set; }
        public string ImageUrl { get; set; }
    }
}
