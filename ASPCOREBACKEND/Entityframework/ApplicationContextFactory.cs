using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace EnityFramework
{
    public class ApplicationContextFactory : IDesignTimeDbContextFactory<ApplicationContext>
    {
        public ApplicationContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<ApplicationContext>();

            builder.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB; Initial Catalog = AngularCart;");

            return new ApplicationContext(builder.Options);
        }
    }
}
