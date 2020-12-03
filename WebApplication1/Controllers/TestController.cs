using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using WebApplication1.Model;
using WebApplication1.Repository;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> _logger;
        private readonly MsSqlRepository msSqlRepository;

        public TestController(ILogger<TestController> logger, MsSqlRepository msSqlRepository)
        {
            _logger = logger;
            this.msSqlRepository = msSqlRepository;
        }

        [HttpGet]
        public IEnumerable<Customer> GetCustomer()
        {
            return Customer.GetFakeDatas().ToList();
        }
        [HttpGet]
        public IEnumerable<Customer> GetDbCustomer()
        {
            return msSqlRepository._myContext.Customers.Where(c => c.Status == 1).Include(c => c.Order).ToList();
        }
        
        [HttpGet]
        public void InsertOneFakeData()
        {
            msSqlRepository._myContext.Customers.Add(new Customer()
            {
                Id=1.ToString(),
                Name = "Tom",
                Country = "Tai",
                State = "ab",
                Zip = "408",
                Address = "Massachusetts Ave, Cambridge",
                Status = 1
                
            });
            msSqlRepository._myContext.SaveChanges();
        }
    }
}
