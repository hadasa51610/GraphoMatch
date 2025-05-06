using AutoMapper;
using GraphoMatch.API.Models;
using GraphoMatch.Core.DTOs;
using GraphoMatch.Core.Models;
using GraphoMatch.Core.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GraphoMatch.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly IJobService _jobService;
        private readonly IMapper _mapper;
        public JobController(IJobService jobService, IMapper mapper)
        {
            _mapper = mapper;
            _jobService = jobService;
        }

        // GET: api/<JobController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobDTO>>> Get()
        {
            var jobs = await _jobService.GetAsync();
            return jobs == null ? NotFound() : Ok(jobs);
        }

        // GET api/<JobController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobDTO>> Get(int id)
        {
            var job = await _jobService.GetByIdAsync(id);
            return job == null ? NotFound() : Ok(job);
        }

        // GET api/<JobController>/5
        [HttpGet("{id}/seekers")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetSeekers(int id)
        {
            var users = await _jobService.GetAllSeekers(id);
            return users == null ? NotFound() : Ok(users);
        }

        // POST api/<JobController>
        [HttpPost]
        public async Task<ActionResult<JobDTO>> Post([FromBody] JobPostModel job)
        {
            if (job == null) return BadRequest("Job data is required.");
            var jobDto = _mapper.Map<JobDTO>(job);
            jobDto = await _jobService.AddAsync(jobDto);
            return Ok(jobDto);

        }

        // PUT api/<JobController>/5
        [HttpPut("{id}/seeker/{userId}")]
        public async Task<ActionResult<UserDto>> Put(int id,int userId)
        {
            var job = await _jobService.GetAllSeekers(id);
            var user= job.FirstOrDefault(u=>u.Id == userId);
            if (user != null)
            {
                return BadRequest("Apply already exists");
            }
            user = await _jobService.AddSeeker(id,userId);
            return user == null ? NotFound() : Ok(User);
        }

        // PUT api/<JobController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<JobDTO>> Put(int id, [FromBody] JobPostModel job)
        {
            if (job == null) return BadRequest("Job data is required.");
            var jobDto = _mapper.Map<JobDTO>(job);
            jobDto = await _jobService.UpdateAsync(id, jobDto);
            return jobDto == null ? NotFound() : Ok(jobDto);
        }

        // DELETE api/<JobController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (await _jobService.GetByIdAsync(id) == null) return NotFound();
            return Ok(await _jobService.RemoveAsync(id));
        }
    }
}