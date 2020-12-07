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

        public IEnumerable<CustomerWithThreeYearAmount> SelectAll(CustomerDto customerDto)
        {
            var customers = SelectCustomers(customerDto);

            foreach (var customer in customers)
            {
                customer.Order = SelectOrders(customer).ToList();
                yield return new CustomerWithThreeYearAmount(customer);
            }
        }

        private IEnumerable<Customer> SelectCustomers(CustomerDto customerDto)
        {
            //todo 優化寫法
            var selectOptions = new Customer(customerDto);

            var likeCmdList = new Dictionary<string, string>()
            {
                {nameof(selectOptions.Id),selectOptions.Id },
                {nameof(selectOptions.Name),selectOptions.Name },
                {nameof(selectOptions.Country),selectOptions.Country },
                {nameof(selectOptions.State),selectOptions.State },
                {nameof(selectOptions.Address),selectOptions.Address },
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
                cmd.Append("select * from Customers where ");
                cmd.Append($"status = 1 ");
                cmd.Append($"and (");
                cmd.Append(likeString);
                cmd.Append($")");
                Console.WriteLine(cmd.ToString());
                return con.Query<Customer>(cmd.ToString(), selectOptions);
            }
        }

        private IEnumerable<Order> SelectOrders(Customer customer)
        {
            using (var con = new SqlConnection(_connectionString))
            {
                var cmd = new StringBuilder();
                cmd.Append("select * from Orders where ");
                cmd.Append($"{nameof(Order.CustomerId)} = @{nameof(Order.CustomerId)}");

                return con.Query<Order>(cmd.ToString(), new Order() { CustomerId = customer.Id });
            }
        }
    }
}