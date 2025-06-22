using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GraphoMatch.Core.Models
{
    [Table("Role")]
    public class Role
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "The 'RoleName' field is required.")]
        [MaxLength(255)] 
        public string RoleName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<User> Users { get; set; }=new List<User>();

        public ICollection<Permission> Permissions { get; set; } = new List<Permission>();

        public Role()
        {
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
        }
    }
}

