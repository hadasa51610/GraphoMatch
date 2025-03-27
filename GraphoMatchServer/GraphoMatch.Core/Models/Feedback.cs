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

        public string Content {  get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UploadedAt { get; set; }
        public Feedback()
        {
            CreatedAt = DateTime.Now;
            UploadedAt = DateTime.Now;
        }
    }
}
