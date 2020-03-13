using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Application.Models
{
    public class Product: Entity
    {
        public string Name { get; set; }
        [ForeignKey("Brand")]
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        public double Price { get; set; }
        [Column(TypeName = "nvarchar(24)")]
        public Categories Category { get; set; }
        public Stock Stock { get; set; }
        public string Destription { get; set; }
        public string ImageUrl { get; set; }
        public DateTime DateModified { get; set; }
    }
}
