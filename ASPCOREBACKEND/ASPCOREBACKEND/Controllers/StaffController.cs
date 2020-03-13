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
   
    public class StaffController : ControllerBase
    {
        private readonly ApplicationContext context;
        private readonly IMapper mapper;
        private readonly IAuthRepository authRepository;
        private readonly IConfiguration configuration;
        public StaffController(ApplicationContext context, IMapper mapper,
                                IAuthRepository authRepository, IConfiguration configuration)
        {
            this.context = context;
            this.mapper = mapper;
            this.configuration = configuration;
            this.authRepository = authRepository;
        }
    
        [HttpPost("Create")]
        public async Task<ActionResult> Staff([FromBody] RegisterDtos input)
        {
            if (await authRepository.UserExist(input.Email.ToLower()))
                BadRequest("Email already exist");
            var person = await authRepository.SigningUp(mapper.Map<Person>(input), input.Password);
            person = await context.Person.FirstAsync(person => person.Email == input.Email);
            var staff = new Staff();
            var account = new StringExtensioncs();
            staff.PersonID = person.Id;
            await context.Staff.AddAsync(staff);
            await context.SaveChangesAsync();
            return Ok();
        }
        [HttpPost("SignIn")]
        public async Task<ActionResult> SignIn(RegisterDtos input)
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
        [HttpPost("Update")]
        public async Task<ActionResult> Update(ProfileDtos input)
        {
            var person = await context.Person.FirstOrDefaultAsync(person => person.Email == User.Identity.Name);
            if (person == null)
            {
                throw new Exception("User does not exist");
            }
            context.Entry(person).CurrentValues.SetValues(input);
            await context.SaveChangesAsync();
            return Ok();
        }
        [Authorize]
        [HttpGet("get")]
        public async Task<ActionResult<ProfileDtos>> Get()
        {
            var person = await context.Person.FirstOrDefaultAsync(person => person.Email == User.Identity.Name);
            return mapper.Map<ProfileDtos>(person);
        }
    }
}
