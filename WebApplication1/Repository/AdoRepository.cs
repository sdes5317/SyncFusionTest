using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using WebApplication1.Model;

namespace WebApplication1.Repository
{
    public class AdoRepository : ISqlRepository
    {
        private string _connectionString;

        public AdoRepository(IConfiguration configuration)
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
                var cmdString = new StringBuilder();
                cmdString.Append("select * from Customers where ");
                cmdString.Append($"status = 1 ");
                cmdString.Append($"and (");
                cmdString.Append(likeString);
                cmdString.Append($")");

                con.Open();

                var sqlCmd = new SqlCommand(cmdString.ToString(), con);
                sqlCmd.Parameters.AddWithValue($"@{nameof(selectOptions.Id)}", selectOptions.Id);
                sqlCmd.Parameters.AddWithValue($"@{nameof(selectOptions.Name)}", selectOptions.Name);
                sqlCmd.Parameters.AddWithValue($"@{nameof(selectOptions.Country)}", selectOptions.Country);
                sqlCmd.Parameters.AddWithValue($"@{nameof(selectOptions.State)}", selectOptions.State);
                sqlCmd.Parameters.AddWithValue($"@{nameof(selectOptions.Address)}", selectOptions.Address);
                sqlCmd.Parameters.AddWithValue($"@{nameof(selectOptions.Zip)}", selectOptions.Zip);

                var reader = sqlCmd.ExecuteReader();
                while (reader.Read())
                {
                    yield return new Customer()
                    {
                        Id = reader[nameof(Customer.Id)].ToString(),
                        Name = reader[nameof(Customer.Name)].ToString(),
                        Country = reader[nameof(Customer.Country)].ToString(),
                        State = reader[nameof(Customer.State)].ToString(),
                        Address = reader[nameof(Customer.Address)].ToString(),
                        Zip = reader[nameof(Customer.Zip)].ToString()
                    };
                }
            }
        }

        private IEnumerable<Order> SelectOrders(Customer customer)
        {
            using (var con = new SqlConnection(_connectionString))
            {
                var cmdString = new StringBuilder();
                cmdString.Append("select * from Orders where ");
                cmdString.Append($"{nameof(Order.CustomerId)} =@{nameof(Order.CustomerId)}");

                con.Open();
                var sqlCmd = new SqlCommand(cmdString.ToString(), con);
                sqlCmd.Parameters.Add(nameof(Order.CustomerId), SqlDbType.VarChar);
                sqlCmd.Parameters[nameof(Order.CustomerId)].Value = customer.Id;

                var reader = sqlCmd.ExecuteReader();
                while (reader.Read())
                {
                    yield return new Order()
                    {
                        Id = reader[nameof(Order.Id)].ToString(),
                        CustomerId = reader[nameof(Order.CustomerId)].ToString(),
                        TotalAmount = decimal.Parse(reader[nameof(Order.TotalAmount)].ToString()),
                        Status = int.Parse(reader[nameof(Order.Status)].ToString()),
                        OrderDate = DateTime.Parse(reader[nameof(Order.OrderDate)].ToString()),
                        SalesName = reader[nameof(Order.SalesName)].ToString()
                    };
                }
            }
        }
    }
}