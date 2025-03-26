using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Models
{
    [Table("FeedBack")]
    public class Feedback
    {
        [Key]
        public int Id { get; set; }

        //[ForeignKey(nameof(Id))]
        //one to one - user to feedback
        public int UserId {  get; set; }
        public User User { get; set; }

        //one to one - feedback to analysis
        [ForeignKey(nameof(Id))]
        public int AnalysisId {  get; set; }
        public Analysis Analysis { get; set; }

        public int Rating {  get; set; }
        public string Comment {  get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UploadedAt { get; set; }
        public Feedback()
        {
            User = new User();
            Analysis = new Analysis();
            CreatedAt = DateTime.Now;
            UploadedAt = DateTime.Now;
        }
    }
}
