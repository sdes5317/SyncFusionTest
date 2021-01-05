using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebApplication1.Model;

namespace WebApplication1.Repository
{
    public class QueryStringService
    {

        public string GetSelectAllCustomersCmd()
        {
            var thisYear = DateTime.Now.Year.ToString();
            var lastYear = DateTime.Now.AddYears(-1).Year.ToString();
            var theYearBeforeLast = DateTime.Now.AddYears(-2).Year.ToString();

            var cmd = $@"SELECT Customers.Id, 
                                    NAME, 
                                    Country, 
                                    State, 
                                    Zip, 
                                    City, 
                                    Address, 
                                    CustomerId, 
                                    Isnull([{theYearBeforeLast}], 0) AS TheYearBeforeLast, 
                                    Isnull([{lastYear}], 0) AS LastYear, 
                                    Isnull([{thisYear}], 0) AS ThisYear, 
                                    Number1,
                                    Number2,
                                    Number3 
                             FROM   (SELECT CustomerId, 
                                            Sum(Orders.TotalAmount) AS total, 
                                            Year(Orders.OrderDate)  AS year 
                                     FROM   Orders 
                                     GROUP  BY Year(Orders.OrderDate), 
                                               CustomerId) AS raw 
                                    PIVOT (Sum(raw.total) 
                                          FOR raw.year IN ([{theYearBeforeLast}],
                                                           [{lastYear}], 
                                                           [{thisYear}]) ) AS pvt 
                                    INNER JOIN Customers 
                                            ON Customers.Id = pvt.customerid 
                             WHERE  Customers.Status = 1 ";

            return cmd;
        }
        /// <summary>
        ///SELECT Customers.Id, 
        ///       NAME, 
        ///       Country, 
        ///       State, 
        ///       Zip, 
        ///       City, 
        ///       Address, 
        ///       CustomerId, 
        ///       Isnull([2018], 0) AS TheYearBeforeLast, 
        ///       Isnull([2019], 0) AS LastYear, 
        ///       Isnull([2020], 0) AS ThisYear 
        ///FROM   (SELECT CustomerId, 
        ///               Sum(Orders.TotalAmount) AS total, 
        ///               Year(Orders.OrderDate)  AS year 
        ///        FROM   Orders 
        ///        GROUP  BY Year(Orders.OrderDate), 
        ///                  CustomerId) AS raw 
        ///       PIVOT (Sum(raw.total) 
        ///             FOR raw.year IN ([2018], 
        ///                              [2019], 
        ///                              [2020]) ) AS pvt 
        ///       INNER JOIN Customers 
        ///               ON Customers.Id = pvt.customerid 
        ///WHERE  Customers.Status = 1 
        /// </summary>
        /// <param name="selectOptions"></param>
        /// <returns></returns>
        public string GetSelectCustomersByOptionsCmd(Customer selectOptions)
        {
            var thisYear = DateTime.Now.Year.ToString();
            var lastYear = DateTime.Now.AddYears(-1).Year.ToString();
            var theYearBeforeLast = DateTime.Now.AddYears(-2).Year.ToString();

            var likeCmdList = new Dictionary<string, string>()
            {
                {nameof(selectOptions.Id),selectOptions.Id },
                {nameof(selectOptions.Name),selectOptions.Name },
                {nameof(selectOptions.Country),selectOptions.Country },
                {nameof(selectOptions.State),selectOptions.State },
                {nameof(selectOptions.Address),selectOptions.Address },
                {nameof(selectOptions.City),selectOptions.City },
                {nameof(selectOptions.Zip),selectOptions.Zip },
            }
            .Where(x => !string.IsNullOrEmpty(x.Value))
            .Select(x => $"{x.Key} like '%' + @{x.Key} + '%'")
            .ToList();

            if (likeCmdList is null || likeCmdList.Count == 0) throw new ArgumentNullException("請至少輸入一個模糊搜尋欄位");

            var likeString = string.Join(" and ", likeCmdList);
            var cmd = new StringBuilder();
            cmd.Append($@"SELECT Customers.Id, 
                                    NAME, 
                                    Country, 
                                    State, 
                                    Zip, 
                                    City, 
                                    Address, 
                                    CustomerId, 
                                    Isnull([{theYearBeforeLast}], 0) AS TheYearBeforeLast, 
                                    Isnull([{lastYear}], 0) AS LastYear, 
                                    Isnull([{thisYear}], 0) AS ThisYear, 
                                    Number1,
                                    Number2,
                                    Number3 
                             FROM   (SELECT CustomerId, 
                                            Sum(Orders.TotalAmount) AS total, 
                                            Year(Orders.OrderDate)  AS year 
                                     FROM   Orders 
                                     GROUP  BY Year(Orders.OrderDate), 
                                               CustomerId) AS raw 
                                    PIVOT (Sum(raw.total) 
                                          FOR raw.year IN ([{theYearBeforeLast}], 
                                                           [{lastYear}], 
                                                           [{thisYear}]) ) AS pvt 
                                    INNER JOIN Customers 
                                            ON Customers.Id = pvt.customerid 
                             WHERE  Customers.Status = 1 ");
            cmd.Append($"and (");
            cmd.Append(likeString);
            cmd.Append($")");

            return cmd.ToString();
        }
    }
}