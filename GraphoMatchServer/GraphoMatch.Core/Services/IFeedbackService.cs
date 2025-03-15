using GraphoMatch.Core.DTOs;
using GraphoMatch.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Services
{
    public interface IFeedbackService:IService<FeedbackDto>
    {
        Task<FeedbackDto?> GetByUserIdAsync(int userId);
        Task<FeedbackDto?> GetByAnalysisIdAsync(int analysisId);
    }
}
