﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Models
{
    [Table("HandWriting")]
    public class HandWriting
    {
        [Key]
        public int Id {  get; set; }
        public string FileName { get; set; }
        public string Url { get; set; }
        public string Type { get; set; }
        public string AnalysisResult { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UploadedAt { get; set; }

        [ForeignKey(nameof(User))]
        public int UserId {  get; set; }
        public User User { get; set; }

        public HandWriting()
        {
            CreatedAt= DateTime.Now;
            UploadedAt= DateTime.Now;
            AnalysisResult = "";
        }
    }
}
