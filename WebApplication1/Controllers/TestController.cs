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

        public TestController(ILogger<TestController> logger, ISqlRepository msSqlRepository)
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
        public IEnumerable<CustomerWithThreeYearAmount> GetDbCustomer(CustomerDto customerDto)
        {
            return _sqlRepository.SelectAll(customerDto);
        }
        
        [HttpGet]
        public void InsertOneFakeData()
        {
            _sqlRepository.InsertFakeData(Customer.GetFakeCustomers());
        }
    }
}
