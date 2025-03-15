using GraphoMatch.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.DTOs
{
    public class FeedbackDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int AnalysisId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
