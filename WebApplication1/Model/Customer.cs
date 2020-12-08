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

        public Customer()
        {

        }
        public Customer(CustomerDto customerDto)
        {
            Id = customerDto.CustomerId;
            Name = customerDto.Name;
            Country = customerDto.Country;
            State = customerDto.State;
            Address = customerDto.Address;
            City = customerDto.City;
            Zip = customerDto.Zip;
        }
    }
}
