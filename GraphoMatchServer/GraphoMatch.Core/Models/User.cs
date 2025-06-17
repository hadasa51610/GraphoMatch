using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Models
{
    [Table("User")]
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [MaxLength(128)]
        public string Password { get; set; }
        public string Profession { get; set; }
        public List<Role> Roles { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public List<HandWriting> HandWritings { get; set; }

        public List<Job> Jobs { get; set; }

        public List<Feedback> Feedback { get; set; }

        public User()
        {
            HandWritings = new List<HandWriting>();
            Feedback= new List<Feedback>();
            Roles= new List<Role>();
            Jobs= new List<Job>();
            CreatedAt= DateTime.Now;
            UpdateAt=DateTime.Now;
        }
    }
}
