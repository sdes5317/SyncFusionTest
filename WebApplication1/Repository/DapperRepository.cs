using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebApplication1.Model;

namespace WebApplication1.Repository
{
    public class DapperRepository : ISqlRepository
    {
        private string _connectionString;

        public DapperRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MsSqlLogin");
        }

        public void InsertFakeData(IEnumerable<Customer> customers)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<CustomerWithThreeYearAmount> SelectCustomers(CustomerDto customerDto)
        {
            return SelectCustomersByOptions(customerDto);
        }

        public IEnumerable<CustomerWithThreeYearAmount> SelectAllCustomers()
        {
            return SelectAll2();
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
        /// <param name="customerDto"></param>
        /// <returns></returns>
        private IEnumerable<CustomerWithThreeYearAmount> SelectCustomersByOptions(CustomerDto customerDto)
        {
            var thisYear = DateTime.Now.Year.ToString();
            var lastYear = DateTime.Now.AddYears(-1).Year.ToString();
            var theYearBeforeLast = DateTime.Now.AddYears(-2).Year.ToString();

            var selectOptions = new Customer(customerDto);

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

            using (var con = new SqlConnection(_connectionString))
            {
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
                                    Isnull([{thisYear}], 0) AS ThisYear 
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

                return con.Query<CustomerWithThreeYearAmount>(cmd.ToString(), selectOptions);
            }
        }
        private IEnumerable<CustomerWithThreeYearAmount> SelectAll()
        {
            var thisYear = DateTime.Now.Year.ToString();
            var lastYear = DateTime.Now.AddYears(-1).Year.ToString();
            var theYearBeforeLast = DateTime.Now.AddYears(-2).Year.ToString();

            using (var con = new SqlConnection(_connectionString))
            {
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
                                    Isnull([{thisYear}], 0) AS ThisYear 
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
                return con.Query<CustomerWithThreeYearAmount>(cmd);
            }
        }
        private IEnumerable<CustomerWithThreeYearAmount> SelectAll2()
        {
            var thisYear = DateTime.Now.Year.ToString();
            var lastYear = DateTime.Now.AddYears(-1).Year.ToString();
            var theYearBeforeLast = DateTime.Now.AddYears(-2).Year.ToString();

            using (var con = new SqlConnection(_connectionString))
            {
                var cmd = $@"select 
                            	  Customers.Id
                            	  ,YEAR(OrderDate) as Year
                                  ,Name
                                  ,Country
                                  ,State
                                  ,Zip
                                  ,City
                                  ,Address
                            	  ,CustomerId
                            	  ,SUM(TotalAmount) as Total
                            from Customers 
                            inner join Orders on Orders.CustomerId = Customers.Id
                            where Customers.Status=1
                            group by Customers.Id,YEAR(OrderDate),Name
                                  ,Country
                                  ,State
                                  ,Zip
                                  ,City
                                  ,Address
                            	  ,CustomerId
                            order by Id";
                var results = con.Query<CustomerTemp>(cmd);
                var dic = results.ToDictionary(x => $"{x.CustomerId}:{x.Year}");
                var keys = new HashSet<string>(results.Select(x => x.CustomerId));

                var customers = new Dictionary<string, CustomerWithThreeYearAmount>();

                foreach (var res in results)
                {
                    string id = res.CustomerId;
                    if (!customers.ContainsKey(id))
                    {
                        customers.Add(id, new CustomerWithThreeYearAmount()
                        {
                            Id = id,
                            Address = res.Address,
                            City = res.City,
                            Country = res.Country,
                            Name = res.Name,
                            State = res.State,
                            Zip = res.Zip,
                            ThisYear = dic.TryGetValue($"{id}:{thisYear}", out var thisyear) ? thisyear.Total : 0,
                            LastYear = dic.TryGetValue($"{id}:{lastYear}", out var lastyear) ? lastyear.Total : 0,
                            TheYearBeforeLast = dic.TryGetValue($"{id}:{theYearBeforeLast}", out var theyearbeforelast) ? theyearbeforelast.Total : 0
                        });
                    }
                }

                return customers.Select(x => x.Value);
            }
        }
    }
}