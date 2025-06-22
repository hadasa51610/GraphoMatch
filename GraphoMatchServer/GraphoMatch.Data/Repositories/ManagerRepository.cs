using GraphoMatch.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Data.Repositories
{
    public class ManagerRepository : IManagerRepository
    {
        DataContext _context;
        public IUserRepository _users { get; }
        public IHandWritingRepository _handWriting { get; }
        public IFeedbackRepository _feedback { get; }
        public IJobRepository _jobs { get; }

        public IRoleRepository _roles { get; }

        public ManagerRepository(DataContext context, IUserRepository users, IHandWritingRepository handWriting, IFeedbackRepository feedback, IJobRepository jobs, IRoleRepository roles)
        {
            _context = context;
            _users = users;
            _handWriting = handWriting;
            _feedback = feedback;
            _jobs = jobs;
            _roles = roles;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
