using System;
using System.Text;
using System.Diagnostics;
using Bytescout.Spreadsheet;
using System.IO;
using System.Data;
using System.Data.OleDb;
using Excel = Microsoft.Office.Interop.Excel;
using System.Collections.Generic;
using Application.Models;
using System.Reflection;

namespace PopulateData
{
    class  Program
    {
        static void Main(string[] args)
        {
            AddProduct();
        }
        static public DataRow[] GetTableFromExcel()
        {
            var filename = "Companies.xlsx";
            string connStr = String.Format(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=""Excel 12.0 Xml;HDR=YES""", filename);
            OleDbConnection conn = new OleDbConnection(connStr);
            conn.Open();
            OleDbDataAdapter objDA = new System.Data.OleDb.OleDbDataAdapter
                ("select * from [Sheet1$]", conn);
            DataSet excelDataSet = new DataSet();
            objDA.Fill(excelDataSet);
            var ds = excelDataSet.Tables[0];
            return ds.Select();
        }
        static public void AddProduct()
        {
            var product = new Product();
            foreach (var dataRow in GetTableFromExcel())
            {
                
                 product = MappingSrc.CreateItemFromRow<Product>(dataRow);
            }
            Console.WriteLine();

        }
     

    }
}
        
    

