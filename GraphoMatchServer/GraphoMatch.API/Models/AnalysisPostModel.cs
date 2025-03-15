using GraphoMatch.Core.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace GraphoMatch.API.Models
{
    public class AnalysisPostModel
    {
        public int FileId { get; set; }
        public string AnalysisResult { get; set; }
        public string Recommendation { get; set; }
        public DateTime AnalysisDate { get; set; }
    }
}
