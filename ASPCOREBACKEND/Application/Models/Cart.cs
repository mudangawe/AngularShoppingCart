using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Models
{
    public class Cart
    {
        public int CartID { get; set; }
        public int CustomerID { get; set; }
        public int ProductID { get; set; }
        public int Quantity { get; set; }
    }
}
