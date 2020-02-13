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
        public bool IsIdentityNumberAvalable { get; set; }
        public string Email { get; set; }
        public bool isEmailAvalable { get; set; }

        public bool LoginPassed { get; set; }
        public bool RegistedPassed { get; set; }
    }
}
