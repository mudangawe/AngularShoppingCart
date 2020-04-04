using Application.Models;
using System.Collections.Generic;

namespace ASPCOREBACKEND.Controllers
{
    public class OrdersDtos
    {
        public string References { get; set; }
        public List<OrderIteams> OrderIteams { get; set; }
    }
}