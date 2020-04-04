using Application.Models;
using EnityFramework;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCOREBACKEND.Data
{
    public class AuthRepository: IAuthRepository
    {
        private readonly ApplicationContext context;
        public AuthRepository(ApplicationContext context)
        {
            this.context = context;
        }
        public async Task<Person> SignIn(Person user, string password)
        {
            var person = await  context.Person.FirstOrDefaultAsync(person => person.Email == user.Email);
            if (person == null)
            {
                return null;
            }
            if (!VerifyPassword(password, person.PasswordHash, person.PasswordSalt))
            {
                return null;
            }
            return person;
        }
        public async Task<Person> SigningUp(Person person,string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password,out passwordHash,out passwordSalt);
            person.PasswordHash = passwordHash;
            person.PasswordSalt = passwordSalt;
            await context.Person.AddAsync(person);
            await context.SaveChangesAsync();
            return person;
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)); 
                for (int i = 0; i < computedHash.Length; i++)
                { 
                    if (computedHash[i] != passwordHash[i]) return false; 
                }
            }
            return true;
        }
        public async Task<bool> UserExist(string email)
        {
            if (await context.Person.AnyAsync(x => x.Email == email))
                return true;
            return false;
        }
    }
}
