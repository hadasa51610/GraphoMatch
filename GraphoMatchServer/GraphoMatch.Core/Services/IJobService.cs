using GraphoMatch.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Services
{
    public interface IJobService:IService<JobDTO>
    {
        Task<IEnumerable<UserDto>> GetAllSeekers(int id);
        Task<UserDto> AddSeeker(int id,int userId);
    }
}
