using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Models
{
    //public enum Role { ADMIN, GRAPHOLOGIST, USER };

    [Table("User")]
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [MaxLength(128)]
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Profession { get; set; }

        //One to one - user to role
        public List<Role> Roles { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdateAt { get; set; }

        // One-to-many relationship with HandWriting
        public HandWriting HandWriting { get; set; }

        public List<Job> Jobs { get; set; }

        //one to one - feedback to user
        //[ForeignKey(nameof(Id))]
        public List<Feedback> Feedback { get; set; }

        public User()
        {
            Feedback= new List<Feedback>();
            Roles= new List<Role>();
            Jobs= new List<Job>();
            CreatedAt= DateTime.Now;
            UpdateAt=DateTime.Now;
        }
    }
}
