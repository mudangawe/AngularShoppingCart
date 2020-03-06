using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application;
using Application.Models;
using ASPCOREBACKEND.Controllers.Dtos;
using AutoMapper;
using EnityFramework;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ASPCOREBACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationContext context;
        private readonly IMapper mapper;

        public CustomerController(ApplicationContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        
        [HttpPost("Create")]
        public async Task<ActionResult> Customer([FromBody] PersonDtos personDtos)
        {
            if (context.Person.Any(person => person.IdentityNumber == personDtos.IdentityNumber)) {
                throw new Exception("Identity Number already exist, kindly conduct support for assist");
            }
            else if (context.Person.Any(person => person.Email == personDtos.Email)) {
                throw new Exception("Email already exist, Kindly sign in");
            }
            else
            {

                await context.Person.AddAsync(mapper.Map<Person>(personDtos));
                StringExtensioncs stringExtensioncs = new StringExtensioncs();
                var customer = new Customer();
                customer.AccountNumber = stringExtensioncs.GenerateAccountNumber();
                context.SaveChanges();
                var person = await context.Person.FirstAsync(person => person.Email == personDtos.Email);
                customer.PersonId = person.Id;
                await context.Customer.AddAsync(customer);
                await context.SaveChangesAsync();
            }
            return Ok();

        }
        // PUT: api/Customer/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
