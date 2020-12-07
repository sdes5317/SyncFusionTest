using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Model;

namespace WebApplication1.Repository
{
    public class EfCorelRepository : ISqlRepository
    {
        public MyContext _myContext { get; set; }

        public EfCorelRepository(MyContext myContext)
        {
            _myContext = myContext;
            //Create db if not exist
            _myContext.Database.EnsureCreated();
        }

        public IEnumerable<CustomerWithThreeYearAmount> SelectAll(CustomerDto customerDto)
        {
            var customers= _myContext.Customers
                .Where(c => c.Status == 1 &&
                        ((!string.IsNullOrEmpty(customerDto.CustomerId) && c.Id.Contains(customerDto.CustomerId)) ||
                         (!string.IsNullOrEmpty(customerDto.Name) && c.Name.Contains(customerDto.Name)) ||
                         (!string.IsNullOrEmpty(customerDto.Country) && c.Country.Contains(customerDto.Country)) ||
                         (!string.IsNullOrEmpty(customerDto.State) && c.State.Contains(customerDto.State)) ||
                         (!string.IsNullOrEmpty(customerDto.Address) && c.Address.Contains(customerDto.Address)) ||
                         (!string.IsNullOrEmpty(customerDto.Zip) && c.Zip.Contains(customerDto.Zip))))
                .Include(c => c.Order).ToList();

            foreach (var customer in customers)
            {
               yield return new CustomerWithThreeYearAmount(customer);
            }
        }

        public void InsertFakeData(IEnumerable<Customer> customers)
        {
            var orders = Order.GetFakeOrders(customers);
            _myContext.Customers.AddRange(customers);
            _myContext.Orders.AddRange(orders);
            _myContext.SaveChanges();
        }
    }
}
