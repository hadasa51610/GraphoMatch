using GraphoMatch.Core.DTOs;
using GraphoMatch.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Services
{
    public interface IHandWritingService:IService<HandWritingDto>
    {
        Task<HandWritingDto?> GetByUserId(int userId);
    }
}
