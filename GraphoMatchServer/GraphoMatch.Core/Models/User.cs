using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Models
{
    public enum Role { ADMIN, GRAPHOLOGIST, USER };

    [Table("User")]
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
        public DateTime CreatedAt { get; set; }

        // One-to-many relationship with HandWriting
        public List<HandWriting> HandWritings { get; set; }

        //one to one - feedback to user
        //[ForeignKey(nameof(Id))]
        //public int? FeedbackId {  get; set; }
        public List<Feedback> Feedback { get; set; }
    }
}
