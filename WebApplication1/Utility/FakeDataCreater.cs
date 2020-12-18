using Bogus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Model;

namespace WebApplication1.Utility
{
    public class FakeDataCreater
    {
        public IEnumerable<Customer> GetFakeCustomers()
        {
            var id = 1;

            var randDate =new[] { new DateTime(2020, 5, 5), new DateTime(2019, 5, 5), new DateTime(2018, 5, 5) };

            var testOrders = new Faker<Order>()
                .RuleFor(o => o.Id, f => f.Random.Hash(20))
                .RuleFor(o => o.CustomerId, f => $"{id.ToString().PadLeft(20, '0')}")
                .RuleFor(o => o.TotalAmount, f => f.Random.Decimal())
                .RuleFor(o => o.Status, f => f.Random.Number(3))
                .RuleFor(o => o.SalesName, f => f.Name.FirstName())
                .RuleFor(o => o.OrderDate, f => f.PickRandom(randDate));

            var testCustomer = new Faker<Customer>()
                        .CustomInstantiator(f => new Customer() { Id = (id++).ToString().PadLeft(20, '0') })
                        //Basic rules using built-in generators
                        .RuleFor(c => c.Name, (f, u) => $"{f.Name.FirstName()}")
                        .RuleFor(c => c.Country, f => f.Address.Country().Substring(0, 3))
                        .RuleFor(c => c.State, f => f.Address.State().Substring(0, 2))
                        .RuleFor(c => c.City, f => f.Address.City())
                        .RuleFor(c => c.Address, f => f.Address.StreetAddress())
                        .RuleFor(c => c.Zip, f => f.Address.ZipCode())
                        .RuleFor(c => c.Status, f => f.Random.Number(1))
                        .RuleFor(c => c.Order, f => testOrders.Generate(10).ToList())
                        .RuleFor(c => c.Number1, f => f.Random.Int(1000, 9999))
                        .RuleFor(c => c.Number2, f => f.Random.Decimal(0.01m, 0.99m))
                        .RuleFor(c => c.Number3, f => f.Random.Decimal(1000.01m, 9999.99m));
            for (int i = 0; i < 500; i++)
            {
                yield return testCustomer.Generate();
            }
        }
    }
}
