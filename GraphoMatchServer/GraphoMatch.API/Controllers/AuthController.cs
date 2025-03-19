using AutoMapper;
using GraphoMatch.API.Models;
using GraphoMatch.Core.DTOs;
using GraphoMatch.Core.Services;
using GraphoMatch.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GraphoMatch.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        public AuthController(IAuthService authService,IConfiguration configuration, IMapper mapper)
        {
            _authService = authService;
            _mapper = mapper;
            _config = configuration;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResDto>> Login([FromBody] LoginPostModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Password))
            {
                return BadRequest("Email and password are required.");
            }
            var user=await _authService.LoginAsync(model.Email, model.Password);
            if (user == null)
            {
                return Unauthorized();
            }
            return Ok(user);
            //// כאן יש לבדוק את שם המשתמש והסיסמה מול מסד הנתונים
            //if (model.Name == "" && model.Email == "")
            //{
            //    var token = _authService.GenerateJwtToken(model.Name, new[] { "Admin" });
            //    return Ok(new { Token = token });
            //}
            //else if (model.Name == "editor" && model.Email == "editor123")
            //{
            //    var token = _authService.GenerateJwtToken(model.Name, new[] { "Editor" });
            //    return Ok(new { Token = token });
            //}
            //else if (model.Name == "viewer" && model.Email == "viewer123")
            //{
            //    var token = _authService.GenerateJwtToken(model.Name, new[] { "Viewer" });
            //    return Ok(new { Token = token });
            //}

            //return Unauthorized();
        }
        [HttpPost("register")]
        public async Task<ActionResult<LoginResDto>> RegisterAsync([FromBody] UserPostModel user)
        {
            if (string.IsNullOrWhiteSpace(user.Email) && string.IsNullOrWhiteSpace(user.Password))
                return BadRequest("Email and password are required");
            var userDto = _mapper.Map<UserDto>(user);
            var loginResDto = await _authService.RegisterAsync(userDto);
            if (loginResDto == null)
                return BadRequest("User already exists");
            return Ok(loginResDto);
        }
    }
}