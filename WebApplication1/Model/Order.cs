using System;

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
    }
}
