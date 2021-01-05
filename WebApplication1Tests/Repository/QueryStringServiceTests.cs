using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebApplication1.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApplication1.Repository.Tests
{
    [TestClass()]
    public class QueryStringServiceTests
    {
        private QueryStringService service = new QueryStringService();
        [TestMethod()]
        public void GetSelectAllCustomersCmdTest()
        {
            var thisYear = DateTime.Now.Year;
            var lastYear = thisYear - 1;
            var theYearBeforeLast = thisYear - 2;

            var actually = service.GetSelectAllCustomersCmd();

            var except = $@"SELECT Customers.Id, 
                                    NAME, 
                                    Country, 
                                    State, 
                                    Zip, 
                                    City, 
                                    Address, 
                                    CustomerId, 
                                    Isnull([{theYearBeforeLast}], 0) AS TheYearBeforeLast, 
                                    Isnull([{lastYear}], 0) AS LastYear, 
                                    Isnull([{thisYear}], 0) AS ThisYear, 
                                    Number1,
                                    Number2,
                                    Number3 
                             FROM   (SELECT CustomerId, 
                                            Sum(Orders.TotalAmount) AS total, 
                                            Year(Orders.OrderDate)  AS year 
                                     FROM   Orders 
                                     GROUP  BY Year(Orders.OrderDate), 
                                               CustomerId) AS raw 
                                    PIVOT (Sum(raw.total) 
                                          FOR raw.year IN ([{theYearBeforeLast}],
                                                           [{lastYear}], 
                                                           [{thisYear}]) ) AS pvt 
                                    INNER JOIN Customers 
                                            ON Customers.Id = pvt.customerid 
                             WHERE  Customers.Status = 1 ";

            Assert.AreEqual(except, actually);
        }
    }
}