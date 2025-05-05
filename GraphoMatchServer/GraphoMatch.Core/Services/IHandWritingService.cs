using GraphoMatch.Core.DTOs;
using GraphoMatch.Core.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace GraphoMatch.Core.Services
{
    public interface IHandWritingService:IService<HandWritingDto>
    {
        Task<IEnumerable<HandWritingDto>> GetByUserId(int userId);
        Task<IEnumerable<HandWritingDto>> GetAsync();
        Task<HandWritingDto?> GetByIdAsync(int id);
        Task<HandWritingDto> AddAsync(HandWritingDto entity,IFormFile image);
        Task<bool> RemoveAsync(int id);
        Task<string> AnalyzeHandwritingAsync(int userId);
    }
}
