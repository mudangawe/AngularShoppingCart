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
using Microsoft.EntityFrameworkCore;
using Application;

namespace ASPCOREBACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class PersonController : ControllerBase
    {
        private readonly ApplicationContext context;
        private readonly IMapper mapper;
        public PersonController(ApplicationContext context, IMapper mapper) 
        {
            this.context = context;
            this.mapper = mapper;
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<PersonDtos>> GetAll()
        {
            var persons = await context.Person.ToListAsync();
            return Ok(persons.Select(person => mapper.Map<PersonDtos>(person)));
        }
       
       
    }

       
 }

