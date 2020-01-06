using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Application.Models
{
   public class Individual
    {
        [Key]
        public int Indivial { get; set; }
        [ForeignKey("Customer")]
        public int CustomerID {get;set;}
        [ForeignKey("Person")]
        public int PersonID { get; set; }
    }
}
