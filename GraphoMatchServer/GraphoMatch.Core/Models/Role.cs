//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace GraphoMatch.Core.Models
//{
//    [Table("Role")]
//    public class Role
//    {
//        [Key]
//        public int Id { get; set; }
//        [Required(ErrorMessage = "The 'RoleName' field is required.")]
//        [Column(TypeName = "TEXT")]
//        //[StringLength(50, MinimumLength = 2, ErrorMessage = "The name cannot exceed 50 characters.")]
//        public string RoleName {  get; set; }

//        //[StringLength(50, MinimumLength = 1, ErrorMessage = "The description cannot exceed 50 characters.")]
//        [Column(TypeName = "TEXT")]
//        public string RoleDescription { get; set; }
//        public DateTime CreatedAt { get; set; }
//        public DateTime UpdatedAt { get; set; }
//        public int UserId { get; set; }
//        public List<User> Users { get; set; }
//        List<Permission> Permissions { get; set; }
//        public Role()
//        {
//            Users = new List<User>();
//            Permissions = new List<Permission>();
//            CreatedAt = DateTime.Now;
//            UpdatedAt = DateTime.Now;
//        }
//    }
//}
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
        [Column(TypeName = "TEXT")]
        public string RoleName { get; set; }

        [Column(TypeName = "TEXT")]
        public string RoleDescription { get; set; }

        [Column(TypeName = "DATETIME")]
        public DateTime CreatedAt { get; set; }

        [Column(TypeName = "DATETIME")]
        public DateTime UpdatedAt { get; set; }

        // קשר של Role -> User (אחד)
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        // אפשר להסיר אם אתה לא בונה קשרים רבים לרבים
        public ICollection<Permission> Permissions { get; set; } = new List<Permission>();

        public Role()
        {
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
        }
    }
}
