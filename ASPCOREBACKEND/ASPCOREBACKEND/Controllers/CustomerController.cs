using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application;
using Application.Models;
using ASPCOREBACKEND.Controllers.Dtos;
using ASPCOREBACKEND.Data;
using AutoMapper;
using EnityFramework;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace ASPCOREBACKEND.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationContext context;
        private readonly IMapper mapper;
        private readonly IAuthRepository authRepository;
        private readonly IConfiguration configuration;
        public CustomerController(ApplicationContext context, IMapper mapper, IAuthRepository authRepository,IConfiguration configuration)
        {
            this.context = context;
            this.mapper = mapper;
            this.authRepository = authRepository;
            this.configuration = configuration;
        }
        
        [HttpPost("Create")]
        public async Task<ActionResult> Customer([FromBody] PersonDtos input)
        {

            if (await authRepository.UserExist(input.Email.ToLower()))
                BadRequest("Email already exist");
            var person = await  authRepository.SigningUp(mapper.Map<Person>(input), input.Password);
            person = await context.Person.FirstAsync(person => person.Email == input.Email);
            var customer = new Customer();
            var account =new StringExtensioncs(); 
            customer.PersonId = person.Id;
            customer.AccountNumber = account.GenerateAccountNumber();
            await context.Customer.AddAsync(customer);
            await context.SaveChangesAsync();
            
            return Ok();

        }
        [HttpPost("SignIn")]
        public async Task<ActionResult> SignIn(PersonDtos input)
        {
            if (!await authRepository.UserExist(input.Email.ToLower()))
            {
                BadRequest("Email does't exist");
            }
            var person = await authRepository.SignIn(mapper.Map<Person>(input), input.Password);
            if (person == null)
            {
                return Unauthorized();
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(configuration.GetSection("AppSettings:Token").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.NameIdentifier,person.Id.ToString()),
                    new Claim(ClaimTypes.Name, person.Email)
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return Ok(new { tokenString });
        }
        [Authorize]
        [HttpGet("get/{id}")]
        public string Get()
        {
            return User.Identity.Name;
        }
    }
}
