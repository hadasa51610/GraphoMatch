using GraphoMatch.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Profession { get; set; }
        public List<Role> Roles { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<Job> Jobs { get; set; }

        public UserDto()
        {
            Jobs = new List<Job>();
        }
    }
}
