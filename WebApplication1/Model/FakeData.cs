using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Model
{
    public class FakeData
    {
        public int OrderID { get; set; }
        public string CustomerID { get; set; }
        public int EmployeeID { get; set; }
        public double Freight { get; set; }
        public string ShipCountry { get; set; }

        public static IEnumerable<FakeData> GetFakeDatas()
        {
            for (int i = 1; i < 2; i++)
            {
                yield return new FakeData()
                {
                    OrderID = i,
                    CustomerID = "VINET",
                    EmployeeID = 10,
                    Freight = 12.34,
                    ShipCountry = "Taiwan"
                };
            }
        }
    }
}
