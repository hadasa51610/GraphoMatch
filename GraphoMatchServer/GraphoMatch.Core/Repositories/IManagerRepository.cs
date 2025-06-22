using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Repositories
{
    public interface IManagerRepository
    {
        IRoleRepository _roles {  get; }
        IUserRepository _users {  get; }
        IHandWritingRepository _handWriting { get; }
        IFeedbackRepository _feedback { get; }
        IJobRepository _jobs { get; }
        Task SaveAsync();
    }
}
