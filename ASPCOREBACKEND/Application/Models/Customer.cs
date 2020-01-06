using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Application.Models
{
    public class Customer
    {
        [Key]
        public int CustomerID  {get;set;}
        public string AccountNumber { get; set; }
        public string CustomerType { get; set; }
        public DateTime DateModified { get; set; }
    }
}
