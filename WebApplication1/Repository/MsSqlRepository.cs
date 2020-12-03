using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Repository
{
    public class MsSqlRepository
    {
        public MyContext _myContext { get; set; }

        public MsSqlRepository(MyContext myContext)
        {
            _myContext = myContext;
            //Create db if not exist
            _myContext.Database.EnsureCreated();
        }
    }
}
