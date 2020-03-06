using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPCOREBACKEND.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;
using Microsoft.OpenApi.Models;
using EnityFramework;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using ASPCOREBACKEND.Controllers.Dtos;

namespace ASPCOREBACKEND
{
    public class Startup
    {

        public IConfiguration Configuration { get; }
        private AppConfiguration appConfiguration;
        private readonly string corsPolicy = "CorsPolicy";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            appConfiguration = new AppConfiguration(configuration);
        }

       

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddCors(CorsSetup);
            services.AddAutoMapper(typeof(DtosProfile));
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(appConfiguration.Connection));
            services.AddSwaggerGen(SetupSwagger);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseSwagger();
            app.UseSwaggerUI(SetupSwaggerUI);
           
            app.UseCors(corsPolicy);
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
        private void SetupSwagger(SwaggerGenOptions options)
        {
            options.SwaggerDoc(appConfiguration.Version, new OpenApiInfo()
            {
                Version = $"{appConfiguration.Version}",
                Title = $"{appConfiguration.Name} API",
                Description = appConfiguration.Description

            });
        }

        private void SetupSwaggerUI(SwaggerUIOptions options)
        {
            options.SwaggerEndpoint(
                $"{appConfiguration.ServerAddress}/swagger/{appConfiguration.Version}/swagger.json",
                $"{appConfiguration.Name} API {appConfiguration.Version}"
            );
        }

        private void CorsSetup(CorsOptions options)
        {
            options.AddPolicy(corsPolicy,
                builder =>
                {
                    builder.WithOrigins(appConfiguration.CorsPolicy.Split(',', StringSplitOptions.RemoveEmptyEntries))
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
                });
        }
        

    }
}
