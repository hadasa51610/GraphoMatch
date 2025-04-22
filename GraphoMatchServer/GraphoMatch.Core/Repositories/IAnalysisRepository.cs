using GraphoMatch.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Repositories
{
    public interface IAnalysisRepository:IRepository<Analysis>
    {
        Task<Analysis?> GetByHandWritingIdAsync(int handwritingId);
        Task<Analysis> SaveResultAsync(Analysis result);
    }
}
