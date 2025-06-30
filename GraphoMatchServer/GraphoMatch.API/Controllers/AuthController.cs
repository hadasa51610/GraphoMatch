using AutoMapper;
using GraphoMatch.API.Models;
using GraphoMatch.Core.DTOs;
using GraphoMatch.Core.Services;
using GraphoMatch.Service;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("ping")]
        public ActionResult Get()
        {
            return Ok();
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
        }
        [HttpPost("register")]
        public async Task<ActionResult<LoginResDto>> RegisterAsync([FromBody] UserPostModel user)
        {
            if (string.IsNullOrWhiteSpace(user.Email) && string.IsNullOrWhiteSpace(user.Password))
            {
                return BadRequest("Email and password are required");
            }
            var userDto = _mapper.Map<UserDto>(user);
            var loginResDto = await _authService.RegisterAsync(userDto);
            if (loginResDto == null)
            {
                return Forbid();
            }
            return Ok(loginResDto);
        }
    }
}