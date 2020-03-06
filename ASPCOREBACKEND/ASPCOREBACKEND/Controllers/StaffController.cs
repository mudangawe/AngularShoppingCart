using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
   
    public class StaffController : ControllerBase
    {
        private readonly ApplicationContext context;
        private readonly IMapper mapper;

        public StaffController(ApplicationContext context, IMapper mapper ){
            this.context = context;
            this.mapper = mapper;
        }
    
        [HttpPost("Create")]
        public async Task<ActionResult> Staff([FromBody] PersonDtos personDtos)
        {
            if (context.Person.Any(person => person.IdentityNumber == personDtos.IdentityNumber))
            {
                throw new Exception("Identity Number already exist");
            }
            else
            if (context.Person.Any(person => person.Email == personDtos.Email))
            {
                throw new Exception("Email already exist");
            }
            else
            {

                await context.Person.AddAsync(mapper.Map<Person>(personDtos));
                await context.SaveChangesAsync();
                var person = await context.Person.FirstAsync(person => person.Email == personDtos.Email);
                var staff = new Staff();
                staff.PersonID = person.Id;
                await context.Staff.AddAsync(staff);
                await context.SaveChangesAsync();
            }
            return Ok();

        }

        // PUT: api/Staff/5
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
