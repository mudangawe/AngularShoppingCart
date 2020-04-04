using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Models;
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
        public async Task<ActionResult<List<OrdersDtos>>> GetAll()
        {
            var orders = context.Order.ToList();
            var odersDtos = new List<OrdersDtos>();
            foreach (var order in orders)
            {
                var odersList = context.OrderIteams.Where(iteam => iteam.OrderId == order.Id).ToList();
                odersDtos.Add(new OrdersDtos { References = order.Reference, OrderIteams = odersList });
            }
            return odersDtos;
        }

        [HttpPost("Create")]
        public async Task<ActionResult> Create(CreateOrderDtos[] input)
        {

            var order = new Order();

            order.CustomerId = context.Person.FirstOrDefault(person => person.Email == User.Identity.Name).Id;
            order.OrderStatus = "Requested";
            order.OrderDate = DateTime.Now;
            await context.Order.AddAsync(order);
            await context.SaveChangesAsync();
            var orderId = context.Order.FirstOrDefault(x => x.OrderDate == order.OrderDate).Id;
            var orderItems = new List<OrderIteams>();
            foreach (var oderItemDtos in input)
            {
                var tempOders = mapper.Map<OrderIteams>(oderItemDtos);
                tempOders.OrderId = orderId;
                orderItems.Add(tempOders);
            }
            context.OrderIteams.AddRange(orderItems);
            context.SaveChanges();
            return Ok();
        }

        [HttpDelete("remove/{id}")]
        public async Task<ActionResult>  Delete(int Id)
        {
            return Ok();
        }

    }
}
