using GraphoMatch.Core.DTOs;
using GraphoMatch.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Repositories
{
    public interface IUserRepository:IRepository<User>
    {
        public Task<User?> GetByEmailAsync(string email);
    }
}