using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Application.Models
{
   public class Staff: Entity
    {

        public Boolean IsActive { get; set; }
        [ForeignKey("Person")]
        public int PersonID { get; set; }
        public Person Person { get; set; }
    }
}
