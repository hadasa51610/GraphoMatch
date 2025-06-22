using GraphoMatch.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Repositories
{
    public interface IRoleRepository
    {
        Task<Role?> GetByNameAsync(string roleName);
        Task AddAsync(Role role);
    }
}
