using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application;
using Application.Models;
using ASPCOREBACKEND.Controllers.Dtos;
using EnityFramework;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
namespace ASPCOREBACKEND.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly ApplicationContext applicationContext;
        private readonly IMapper mapper;
        public RegisterController(ApplicationContext applicationContextInjector, IMapper mapper)
        {
            applicationContext = applicationContextInjector;
            this.mapper = mapper;
        }
       
       
        // GET: api/Register/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/Register
        [HttpPost]
        public PersonDTO Post([FromBody] Person person)
        {
            return SaveToDataBase(person);
        }
        private PersonDTO SaveToDataBase(Person input)
        {
            var personDto = mapper.Map<PersonDTO>(input);
            var existing = applicationContext.Persons.FirstOrDefault(pers => pers.Email == input.Email);
            personDto.isEmailAvalable = existing == null ? false : true;
            existing = applicationContext.Persons.FirstOrDefault(pers => pers.IdentityNumber == input.IdentityNumber);
            personDto.IsIdentityNumberAvalable = existing == null ? false : true;
            existing = applicationContext.Persons.FirstOrDefault(pers => pers.IdentityNumber == input.IdentityNumber);
            if (personDto.IsIdentityNumberAvalable == true || personDto.isEmailAvalable == true)
            {
                return personDto;
            }
            else
            {
                applicationContext.Persons.Add(input);
                applicationContext.SaveChanges();
                var stringExtensioncs = new StringExtensioncs();
                var accountDetails = stringExtensioncs.GenerateAccountNumber();
                applicationContext.Customers.Add(accountDetails);
                applicationContext.SaveChanges();
                var individual = new Individual();
                individual.CustomerID = applicationContext.Customers.Single(x => x.AccountNumber == accountDetails.AccountNumber).CustomerID;
                individual.PersonID = applicationContext.Persons.Single(x => x.IdentityNumber == input.IdentityNumber).PersonID;
                applicationContext.Individuals.Add(individual);
                applicationContext.SaveChanges();
            }
            return personDto;
        }

       
    }
}
