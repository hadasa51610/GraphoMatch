using GraphoMatch.Core.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace GraphoMatch.API.Models
{
    public class FeedbackPostModel
    {
        public int UserId { get; set; }
        public int AnalysisId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
    }
}
