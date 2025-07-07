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


        public async Task<IEnumerable<Feedback>> GetByUserIdAsync(int userId)
        {
            return await _feedbacks.Where(f => f.UserId == userId).ToListAsync();
        }

        public async Task<IEnumerable<Feedback>> GetWithUsersAsync()
        {
            return await _feedbacks.Include(f => f.User).ToListAsync();
        }
    }
}
