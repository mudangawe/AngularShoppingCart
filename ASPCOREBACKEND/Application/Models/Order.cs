using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Application.Models
{
    public class Order: Entity
    {
        public int CustomerId { get; set; }
        public int OrderStatus { get; set; }
        public int OrderDate { get; set; }
    }
}
