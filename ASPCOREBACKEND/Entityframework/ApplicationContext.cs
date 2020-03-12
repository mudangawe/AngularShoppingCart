using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Application.Models;
namespace EnityFramework
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Person> Person { get; set; }
        public DbSet<Staff> Staff { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Stock> Stock { get; set; }
        public DbSet<Brand> Brand { get; set; }
        public DbSet<OrderIteams> OrderIteams { get; set; }
        
    }
}
