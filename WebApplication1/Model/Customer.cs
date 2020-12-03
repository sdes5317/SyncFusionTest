using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Model
{
    public class Customer
    {
        public Guid Uid { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public int Status { get; set; }

        public List<Order> Order { get; set; }

        public static IEnumerable<Customer> GetFakeDatas()
        {
            for (int i = 1; i < 100; i++)
            {
                var id = i.ToString();
                var order = new Order()
                {
                    CustomerId=id,
                };

                yield return new Customer()
                {
                    Id = id,
                    Name = "VINET",
                    Country = "TaiChung",
                    State = "abcd",
                    Zip = "408",
                    Address = "Massachusetts Ave, Cambridge",
                    Status = 1
                };
            }
        }
    }
}
