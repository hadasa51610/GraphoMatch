﻿using GraphoMatch.Core.Repositories;
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

        public ManagerRepository(DataContext context, IUserRepository users, IHandWritingRepository handWriting, IFeedbackRepository feedback, IJobRepository jobs)
        {
            _context = context;
            _users = users;
            _handWriting = handWriting;
            _feedback = feedback;
            _jobs = jobs;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
