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
        Task<Feedback?> GetByUserIdAsync(int userId);
        Task<Feedback?> GetByAnalysisIdAsync(int analysisId);
    }
}
