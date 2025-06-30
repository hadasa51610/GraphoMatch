using GraphoMatch.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Repositories
{
    public interface IJobRepository : IRepository<Job>
    {
        Task<IEnumerable<User>> GetAllSeekers(int id);
        Task<User> AddSeeker(int id,User user);
        Task<IEnumerable<Job>> GetWithSeekersAsync();
    }
}
