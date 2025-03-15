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
    public class FeedbackRepository : Repository<Feedback>, IFeedbackRepository
    {
        private readonly DbSet<Feedback> _feedbacks;
        public FeedbackRepository(DataContext context) : base(context)
        {
            _feedbacks = context.Set<Feedback>();
        }

        public async Task<Feedback?> GetByAnalysisIdAsync(int analysisId)
        {
            return await _feedbacks.FirstOrDefaultAsync(f => f.AnalysisId == analysisId);
        }

        public async Task<Feedback?> GetByUserIdAsync(int userId)
        {
            return await _feedbacks.FirstOrDefaultAsync(f => f.UserId == userId);
        }
    }
}
