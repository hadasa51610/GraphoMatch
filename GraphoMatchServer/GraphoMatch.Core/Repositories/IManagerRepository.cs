﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Repositories
{
    public interface IManagerRepository
    {
        IUserRepository _users {  get; }
        IHandWritingRepository _handWriting { get; }
        IAnalysisRepository _analysis { get; }
        IFeedbackRepository _feedback { get; }
        Task SaveAsync();
    }
}
