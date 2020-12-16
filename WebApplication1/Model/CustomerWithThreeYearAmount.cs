using System;
using System.Linq;

namespace WebApplication1.Model
{
    public class CustomerWithThreeYearAmount
    {
        public string CustomerId { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public decimal ThisYear { get; set; }
        public decimal LastYear { get; set; }
        public decimal TheYearBeforeLast { get; set; }

        public CustomerWithThreeYearAmount(Customer customer)
        {
            this.CustomerId = customer.Id;
            this.Name = customer.Name;
            this.Country = customer.Country;
            this.State = customer.State;
            this.Zip = customer.Zip;
            this.City = customer.City;
            this.Address = customer.Address;
            this.ThisYear = customer.Order.Where(o => o.OrderDate.Year == DateTime.Now.Year).Sum(o => o.TotalAmount);
            this.LastYear = customer.Order.Where(o => o.OrderDate.Year == DateTime.Now.AddYears(-1).Year).Sum(o => o.TotalAmount); ;
            this.TheYearBeforeLast = customer.Order.Where(o => o.OrderDate.Year == DateTime.Now.AddYears(-2).Year).Sum(o => o.TotalAmount); ;
        }

        public CustomerWithThreeYearAmount()
        {
        }
    }
}