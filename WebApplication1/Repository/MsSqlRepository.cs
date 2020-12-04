using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Model;

namespace WebApplication1.Repository
{
    public class MsSqlRepository : ISqlRepository
    {
        public MyContext _myContext { get; set; }

        public MsSqlRepository(MyContext myContext)
        {
            _myContext = myContext;
            //Create db if not exist
            _myContext.Database.EnsureCreated();
        }

        public IEnumerable<Customer> SelectAll(CustomerDto customerDto)
        {
            return _myContext.Customers
                .Where(c => c.Status == 1 &&
                        (c.Id.Contains(customerDto.CustomerId) ||
                         c.Name.Contains(customerDto.Name) ||
                         c.Country.Contains(customerDto.Country) ||
                         c.State.Contains(customerDto.State) ||
                         c.Address.Contains(customerDto.Address) ||
                         c.Zip.Contains(customerDto.Zip)))
                .Include(c => c.Order).ToList();
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
