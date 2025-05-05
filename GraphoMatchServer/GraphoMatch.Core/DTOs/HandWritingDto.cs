using GraphoMatch.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.DTOs
{
    public class HandWritingDto
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string Url { get; set; }
        public string Type { get; set; }
        public string AnalysisResult { get; set; }
        public DateTime UploadedAt { get; set; }
        public int UserId { get; set; }
        public int AnalysisId { get; set; }
    }
}