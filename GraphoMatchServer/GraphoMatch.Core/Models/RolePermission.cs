using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Models
{
    [Table("RolePermission")]
    public class RolePermission
    {
        [ForeignKey(nameof(Role))]
        public int RoleId {  get; set; }

        [ForeignKey(nameof(Permission))]
        public int PermissionId {  get; set; }
    }
}
