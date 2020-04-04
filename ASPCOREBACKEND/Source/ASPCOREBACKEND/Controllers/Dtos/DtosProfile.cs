using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Models;
using AutoMapper;
namespace ASPCOREBACKEND.Controllers.Dtos
{
    public class DtosProfile: Profile
    {
        public DtosProfile()
        {
            CreateMap<Person, RegisterDtos>();
            CreateMap<RegisterDtos, Person>();
            CreateMap<ProductDto, Product>().ForMember(destination => destination.DateModified, options => options.Ignore())
                                            .ForMember(destination => destination.Id, options => options.Ignore());

            CreateMap<Product, ProductDto>();
            CreateMap<Person, ProfileDtos>();
            
                                             
         }
    }
}
