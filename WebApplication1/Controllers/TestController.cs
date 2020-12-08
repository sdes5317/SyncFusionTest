using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using WebApplication1.Model;
using WebApplication1.Repository;
using WebApplication1.Utility;

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

        [HttpPost]
        public IEnumerable<CustomerWithThreeYearAmount> GetCustomers(CustomerDto customerDto)
        {
            return _sqlRepository.SelectCustomers(customerDto);
        }
        [HttpPost]
        public IEnumerable<CustomerWithThreeYearAmount> GetAllCustomers()
        {
            return _sqlRepository.SelectAllCustomers();
        }
        
        [HttpGet]
        public void InsertOneFakeData()
        {
            var creater = new FakeDataCreater();
            var customers = creater.GetFakeCustomers().ToList();
            _sqlRepository.InsertFakeData(customers);
        }
    }
}
