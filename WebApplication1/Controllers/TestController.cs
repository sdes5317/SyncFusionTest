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
        private readonly ISqlRepository _sqlRepository;

        public TestController(ILogger<TestController> logger, MsSqlRepository msSqlRepository)
        {
            _logger = logger;
            this._sqlRepository = msSqlRepository;
        }

        [HttpGet]
        public IEnumerable<Customer> GetCustomer()
        {
            return Customer.GetFakeCustomers().ToList();
        }
        [HttpPost]
        public IEnumerable<Customer> GetDbCustomer(CustomerDto customerDto)
        {
            var result= _sqlRepository.SelectAll(customerDto);
            return result;
        }
        
        [HttpGet]
        public void InsertOneFakeData()
        {
            _sqlRepository.InsertFakeData(Customer.GetFakeCustomers());
        }
    }
}
