using GraphoMatch.Core.Models;
using GraphoMatch.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Data.Repositories
{
    public class AnalysisRepository : Repository<Analysis>, IAnalysisRepository
    {
        protected readonly DbSet<Analysis> _dbSet;

        public AnalysisRepository(DataContext context) : base(context)
        {
            _dbSet = context.Set<Analysis>();
        }

        public async Task<Analysis?> GetByHandWritingIdAsync(int handwritingId)
        {
            return await _dbSet.FirstOrDefaultAsync(analysis => analysis.HandWritingId == handwritingId);
        }
    }
}
