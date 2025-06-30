using GraphoMatch.Core.Models;
using GraphoMatch.Core.Repositories;
using GraphoMatch.Data.Repositories;
using GraphoMatch.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GraphoMatch.Core.DTOs;

namespace GraphoMatch.Data.Repositories
{
    public class JobRepository : Repository<Job>, IJobRepository
    {
        public JobRepository(DataContext context) : base(context) { }

        public async Task<User> AddSeeker(int id, User user)
        {
            var existsJob = await _dbSet.FirstOrDefaultAsync(job => job.Id == id);
            if (existsJob != null)
            {
                if (existsJob.Seekers.Find(x => x.Id == user.Id) != null)
                {
                    return null;
                }
                existsJob.Seekers.Add(user);
            }
            return user;
        }
        public async Task<IEnumerable<User>> GetAllSeekers(int id)
        {
            var existsJob = await _dbSet
                .Include(job => job.Seekers)
                .FirstOrDefaultAsync(job => job.Id == id);

            return existsJob?.Seekers;
        }

        public async Task<IEnumerable<Job>> GetWithSeekersAsync()
        {
            return await _dbSet
                .Include(j => j.Seekers)
                .ToListAsync();
        }

    }
}