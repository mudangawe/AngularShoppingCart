using Application.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using System.Text;

namespace Application
{
    public class Mapping
    {
        public static T CreateItemFromRow<T>(DataRow row) where T : new()
        {
            T item = new T();
            SetItemFromRow(item, row);
            return item;
        }

        public static void SetItemFromRow<T>(T item, DataRow row) where T : new()
        {
            foreach (DataColumn c in row.Table.Columns)
            {
                PropertyInfo p = item.GetType().GetProperty(c.ColumnName);
                if (c.ColumnName == "Category")
                {
                    var value = row[c];
                    p.SetValue(item, (Categories)Convert.ToInt32(row[c]), null);
                }
                else if (p != null && row[c] != DBNull.Value)
                {
                    p.SetValue(item, row[c], null);
                }
                
            }
        }

    }
}
