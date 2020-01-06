using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Models;
using AutoMapper;
namespace ASPCOREBACKEND.Controllers.Dtos
{
    public class DtoProfile: Profile
    {
        public DtoProfile()
        {
            CreateMap<Person, PersonDTO>();
            CreateMap<ProductDto, Product>().ForMember(destination => destination.DateModified, options => options.Ignore())
                                            .ForMember(destination => destination.ProductID, options => options.Ignore());
                                          
            CreateMap<Product, ProductDto>();
                                             
         }
    }
}
