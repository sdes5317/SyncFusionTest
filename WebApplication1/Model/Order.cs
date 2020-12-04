using System;
using System.Collections.Generic;
using System.Text;

namespace WebApplication1.Model
{
    public class Order
    {
        public string Id { get; set; }
        public decimal TotalAmount { get; set; }
        public int Status { get; set; }
        public DateTime OrderDate { get; set; }
        public string SalesName { get; set; }

        public string CustomerId { get; set; }
        public Customer Customer { get; set; }

        public static IEnumerable<Order> GetFakeOrders(IEnumerable<Customer> customers)
        {
            var i = 1;
            foreach (var customer in customers)
            {
                yield return new Order()
                {
                    Id = (i++).ToString().PadLeft(20, '0'),
                    CustomerId = customer.Id,
                    TotalAmount = 12.34M,
                    Status = new Random().Next(0, 3),
                    OrderDate = new DateTime(2020, 5, 5),
                    SalesName = "Jeff"
                };
                yield return new Order()
                {
                    Id = (i++).ToString().PadLeft(20, '0'),
                    CustomerId = customer.Id,
                    TotalAmount = 12.34M,
                    Status = new Random().Next(0, 3),
                    OrderDate = new DateTime(2019, 5, 5),
                    SalesName = "Tom"
                };
                yield return new Order()
                {
                    Id = (i++).ToString().PadLeft(20, '0'),
                    CustomerId = customer.Id,
                    TotalAmount = 12.34M,
                    Status = new Random().Next(0, 3),
                    OrderDate = new DateTime(2018, 5, 5),
                    SalesName = "Joe"
                };
            }
        }
    }
}
