using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCOREBACKEND.Controllers.Dtos
{
    public class CreateOrderDtos
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public double Discount { get; set; }
    }
}
