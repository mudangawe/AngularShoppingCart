using Application.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCOREBACKEND.Data
{
    public interface IAuthRepository
    {
          Task<Person> SignIn(Person user,string password);
          Task<Person> SigningUp( Person person,string password);
          Task<bool> UserExist(string email);
    }
}
