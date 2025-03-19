using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.DTOs
{
    public class LoginResDto
    {
        public UserDto User { get; set; }
        public string Token { get; set; }
    }
}
