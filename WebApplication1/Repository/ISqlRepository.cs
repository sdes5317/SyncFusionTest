using System.Collections.Generic;
using WebApplication1.Model;

namespace WebApplication1.Repository
{
    public interface ISqlRepository
    {
        void InsertFakeData(IEnumerable<Customer> customers);
        IEnumerable<CustomerWithThreeYearAmount> SelectAllCustomers();
        IEnumerable<CustomerWithThreeYearAmount> SelectCustomers(CustomerDto customerDto);
    }
}