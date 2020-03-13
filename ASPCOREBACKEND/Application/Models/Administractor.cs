using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Application.Models
{
    class Administractor: Entity
    {
        [ForeignKey("Person")]
        public int PersonID { get; set; }
        public Person Person { get; set; }
       
    }
}
