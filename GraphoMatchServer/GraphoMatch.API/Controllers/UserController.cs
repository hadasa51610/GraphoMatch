using AutoMapper;
using GraphoMatch.API.Models;
using GraphoMatch.Core.DTOs;
using GraphoMatch.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GraphoMatch.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IService<UserDto> _userService;
        private readonly IMapper _mapper;
        public UserController(IService<UserDto> userService,IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [Authorize(Policy ="AdminOnly")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> Get()
        {
            var users = await _userService.GetAsync();
            return users == null ? NotFound() : Ok(users);
        }

        [Authorize(Policy = "UserOrAdmin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> Get(int id)
        {
            var user = await _userService.GetByIdAsync(id);
            return user == null ? NotFound() : Ok(user);
        }

        [Authorize(Policy ="UserOrAdmin")]
        [HttpPost]
        public async Task<ActionResult<UserDto>> Post([FromBody] UserPostModel user)
        {
            if (user == null) return BadRequest("User data is required.");
            var userDto = _mapper.Map<UserDto>(user);
            userDto.CreatedAt = DateTime.Now;
            userDto = await _userService.AddAsync(userDto);
            return Ok(userDto);
        }

        [Authorize(Policy = "UserOrAdmin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<UserDto>> Put(int id, [FromBody] UserPostModel user)
        {
            if (user == null) return BadRequest("User data is required.");
            var userDto = _mapper.Map<UserDto>(user);
            userDto = await _userService.UpdateAsync(id, userDto);
            return userDto == null ? NotFound() : Ok(userDto);
        }

        [Authorize(Policy ="UserOrAdmin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (await _userService.GetByIdAsync(id) == null) return NotFound();
            return Ok(await _userService.RemoveAsync(id));
        }
    }
}
