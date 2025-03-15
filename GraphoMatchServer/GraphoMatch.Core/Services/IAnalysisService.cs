using GraphoMatch.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Services
{
    public interface IAnalysisService:IService<AnalysisDto>
    {
        Task<AnalysisDto?> GetByHandWritingIdAsync(int handwritingId);
    }
}
