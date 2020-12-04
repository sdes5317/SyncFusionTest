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
            using (var con = new SqlConnection(_connectionString))
            {
                var cmd = new StringBuilder();
                cmd.Append("select * from Customers where ");
                cmd.Append($"status = 1 ");
                cmd.Append($"and (");
                cmd.Append($"Id like '%' + @{nameof(customerDto.CustomerId)} + '%' or ");
                cmd.Append($"{nameof(customerDto.Name)} like '%' + @{nameof(customerDto.Name)} + '%' or ");
                cmd.Append($"{nameof(customerDto.Country)} like '%' + @{nameof(customerDto.Country)} + '%' or ");
                cmd.Append($"{nameof(customerDto.State)} like '%' + @{nameof(customerDto.State)} + '%' or ");
                cmd.Append($"{nameof(customerDto.Address)} like '%' + @{nameof(customerDto.Address)} + '%' or ");
                cmd.Append($"{nameof(customerDto.Zip)} like '%' + @{nameof(customerDto.Zip)} + '%' ");
                cmd.Append($")");

                return con.Query<Customer>(cmd.ToString(), customerDto);
            }
        }

        private IEnumerable<Order> SelectOrders(Customer customer)
        {
            using (var con = new SqlConnection(_connectionString))
            {
                var cmd = new StringBuilder();
                cmd.Append("select * from Orders where ");
                cmd.Append($"{nameof(Order.CustomerId)} =@{nameof(Order.CustomerId)}");

                return con.Query<Order>(cmd.ToString(), new Order() { CustomerId = customer.Id });
            }
        }
    }
}