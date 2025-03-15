using GraphoMatch.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.DTOs
{
    public class AnalysisDto
    {
        public int Id { get; set; }
        public int FileId { get; set; }
        public string AnalysisResult { get; set; }
        public string Recommendation { get; set; }
        public DateTime AnalysisDate { get; set; }
        public int FeedbackId { get; set; }
    }
}
