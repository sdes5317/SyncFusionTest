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
    public class DapperRepository : QueryStringService, ISqlRepository
    {
        private string _connectionString;
        private QueryStringService queryStringService;

        public DapperRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MsSqlLogin");
            queryStringService = new QueryStringService();
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
            return SelectAll();
        }

        private IEnumerable<CustomerWithThreeYearAmount> SelectCustomersByOptions(CustomerDto customerDto)
        {
            var selectOptions = new Customer(customerDto);

            using (var con = new SqlConnection(_connectionString))
            {
                var cmd = queryStringService.GetSelectCustomersByOptionsCmd(selectOptions);

                return con.Query<CustomerWithThreeYearAmount>(cmd.ToString(), selectOptions);
            }
        }

        private IEnumerable<CustomerWithThreeYearAmount> SelectAll()
        {
            using (var con = new SqlConnection(_connectionString))
            {
                var cmd = queryStringService.GetSelectAllCustomersCmd();
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
                                  ,Number1
                                  ,Number2
                                  ,Number3 
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
                                  ,Number1
                                  ,Number2
                                  ,Number3 
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
                            CustomerId = id,
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