using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPCOREBACKEND.Controllers.Dtos;
using AutoMapper;
using EnityFramework;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ASPCOREBACKEND.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationContext context;
        private readonly IMapper mapper;
        public OrdersController(ApplicationContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrdersDtos>>> Get()
        {
            var orders =  context.Order.ToList();
            var odersDtos = new List<OrdersDtos>();
            foreach (var order in orders)
            {
                var odersList =  context.OrderIteams.Where(iteam => iteam.OrderId == order.Id).ToList();
                odersDtos.Add(new OrdersDtos { References = order.Reference, OrderIteams = odersList });
            }
            return odersDtos;
        }

        [HttpPost("Create")]
        public async Task<ActionResult> Create(CreateOrderDtos input)
        {
            return Ok();
        }

       
    }
}
