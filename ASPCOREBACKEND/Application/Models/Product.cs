using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
namespace Application.Models
{
    public class Product
    {
        [Key]
        public int ProductID { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Price { get; set; }
        public int PriceLevel { get; set; }
        public string Categories { get; set; }
        public string Destription { get; set; }
        public string ImageUrl { get; set; }
        public string Features { get; set; }
        public DateTime DateModified { get; set; }
    }
}
