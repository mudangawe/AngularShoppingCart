using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCOREBACKEND.Controllers.Dtos
{
    public class PersonDTO
    {


        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string IdentityNumber { get; set; }
        public bool IsIdentityNumberAvalable { get; set; }
        public string Email { get; set; }
        public bool isEmailAvalable { get; set; }
        public string PhoneNumber { get; set; }
        public string AdditionalNumber { get; set; }
        public string Address { get; set; }
    }
}
