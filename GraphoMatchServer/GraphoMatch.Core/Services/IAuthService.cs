using GraphoMatch.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Core.Services
{
    public interface IAuthService
    {
        public Task<bool> ValidateUser(string userEmail, string password);
        public Task<LoginResDto> LoginAsync(string userEmail, string password);
        public Task<LoginResDto> RegisterAsync(UserDto userDto);
    }
}
