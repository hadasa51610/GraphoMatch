using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Models
{
    [Table("Job")]
    public class Job
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }

        [Required]
        public string Company { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Location { get; set; }
        public DateTime Posted { get; set; }

        public List<string> Tags { get; set; }

        [Required]
        public string Salary { get; set; }

        public List<User> Seekers { get; set; }

        public Job()
        {
            Posted = DateTime.Now;
            Tags = new List<string>();
            Seekers = new List<User>();
        }
    }
}