﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Models
{
    [Table("GraphologyAnalysis")]
    public class Analysis
    {
        [Key]
        public int Id { get; set; }

        //one to one - handWriting
        [ForeignKey(nameof(Id))]
        public int HandWritingId { get; set; }
        public HandWriting HandWriting { get; set; }
        public string AnalysisResult {  get; set; }
        public string Recommendation {  get; set; }
        public DateTime AnalysisDate {  get; set; }

        //one to one - feedback to analysis
        //[ForeignKey(nameof(Id))]
        //public int? FeedbackId {  get; set; }
        public Feedback? Feedback { get; set; }
    }
}
