using GraphoMatch.Core.Models;
using GraphoMatch.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Data.Repositories
{
    public class UserRepository : Repository<User>,IUserRepository
    {
        public UserRepository(DataContext context) : base(context)
        {
        }
    }
}
