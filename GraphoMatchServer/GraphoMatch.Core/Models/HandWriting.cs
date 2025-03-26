using System;
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
        public DateTime CreatedAt { get; set; }
        public DateTime UploadedAt { get; set; }

        //one to many - handwritings to user
        [ForeignKey(nameof(Id))]
        public int UserId {  get; set; }
        public User User { get; set; }

        //one to one - result
        //[ForeignKey(nameof(Id))]
        //public int? AnalysisId {  get; set; }
        public Analysis? Analysis { get; set; }
        public HandWriting()
        {
            Analysis = new Analysis();
            User = new User();
            CreatedAt= DateTime.Now;
            UploadedAt= DateTime.Now;
        }
    }
}
