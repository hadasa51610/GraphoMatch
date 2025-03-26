using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Models
{
    [Table("Role")]
    public class Role
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "The 'RoleName' field is required.")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "The name cannot exceed 50 characters.")]
        public string RoleName {  get; set; }
        public string RoleDescription { get; set; } = "description";
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int UserId { get; set; }
        public List<User> Users { get; set; }
        List<Permission> Permissions { get; set; }
        public Role()
        {
            Users = new List<User>();
            Permissions = new List<Permission>();
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
        }
    }
}
