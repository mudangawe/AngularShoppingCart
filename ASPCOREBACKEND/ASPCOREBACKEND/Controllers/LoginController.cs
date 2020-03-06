using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Models;
using EnityFramework;
using AutoMapper;
using ASPCOREBACKEND.Controllers.Dtos;

namespace ASPCOREBACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class UserController : ControllerBase
    {
        private readonly ApplicationContext applicationContext;
        private readonly IMapper mapper;
        public UserController(ApplicationContext applicationcontext,IMapper mapper) 
        {
            this.applicationContext = applicationcontext;
            this.mapper = mapper;
        }

        [HttpPost]
        public  PersonDTO Post([FromBody] Person person)
        {
            if (person.FirstName != null)
            {
                var verify = applicationContext.Persons.Any(user => user.Email == person.Email);
                if (!verify)
                {
                    applicationContext.Persons.Add(person);
                    applicationContext.SaveChanges();
                    PersonDTO personDTO = new PersonDTO();
                    personDTO = mapper.Map<PersonDTO>(person);
                    personDTO.isEmailAvalable = false;
                    personDTO.RegistedPassed = true;
                    return personDTO;
                }
                else
                {
                    PersonDTO personDTO = new PersonDTO();
                    personDTO = mapper.Map<PersonDTO>(person);
                    personDTO.isEmailAvalable = true;
                    personDTO.RegistedPassed = false;
                    return personDTO;
                }
            }
            else
            {
                var user = applicationContext.Persons.SingleOrDefault(user => user.Email == person.Email && user.Password == person.Password);
                   
                if (user == null)
                {
                   
                    var personDTO = mapper.Map<PersonDTO>(person);
                    personDTO.LoginPassed = false;
                    return personDTO;
                }
                else {
                    
                   
                    var personDTO = mapper.Map<PersonDTO>(user);
                    personDTO.LoginPassed = true;
                    return personDTO;
                }
            }
        }

        // PUT: api/Login/5
        [HttpPut("{id}")]
        public bool Put(int id, [FromBody] string value)
        {
            return true;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
