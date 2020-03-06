using Application.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
namespace Application
{
    public class StringExtensioncs
    {
        public Customer GenerateAccountNumber()
        {
            var customer = new Customer();
            string startWith = DateTime.Today.Year.ToString().Substring(2);
            Random generator = new Random();
            var account = startWith + generator.Next(0, 999999).ToString("D6");
          
       
            return customer;
        }
        public Byte[] Base64ToImage(string base64Data)
        {
            base64Data = Regex.Match(base64Data, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value;
            var binData = Convert.FromBase64String(base64Data);
            return binData;
        }
        public string ReadImage(string path)
        {
            byte[] data = File.ReadAllBytes(path);
            return Convert.ToBase64String(data);
        }
        public bool SaveImage(Byte[] file, string fileURl)
        {
            using (var imageFile = new FileStream(fileURl, FileMode.Create))
            {
                imageFile.Write(file, 0, file.Length);
                imageFile.Flush();
            }
            return true;
        }
    }

}
