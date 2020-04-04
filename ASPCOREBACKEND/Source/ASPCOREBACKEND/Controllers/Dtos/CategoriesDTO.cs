using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCOREBACKEND.Controllers.Dtos
{
    public class CategoriesDTO
    {
        public string CategoriesName { get; set; }
        public int PriceLevel { get; set; }
        public string BrandName { get; set; }
    }
}
