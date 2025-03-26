using GraphoMatch.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Repositories
{
    public interface IFeedbackRepository:IRepository<Feedback>
    {
        Task<IEnumerable<Feedback>> GetByUserIdAsync(int userId);
    }
}
