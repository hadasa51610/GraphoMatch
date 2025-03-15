using AutoMapper;
using GraphoMatch.API.Models;
using GraphoMatch.Core.DTOs;
using GraphoMatch.Core.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GraphoMatch.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IService<FeedbackDto> _feedback;
        private readonly IMapper _mapper;

        public FeedbackController(IService<FeedbackDto> service, IMapper mapper)
        {
            _mapper = mapper;
            _feedback = service;
        }


        // GET: api/<FeedbackController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FeedbackDto>>> Get()
        {
            var feedbacks = await _feedback.GetAsync();
            return feedbacks == null ? NoContent() : Ok(feedbacks);
        }

        // GET api/<FeedbackController>/5
        [HttpGet("{id}")]
        public  async Task<ActionResult<FeedbackDto>> Get(int id)
        {
            var feedback = await _feedback.GetByIdAsync(id);
            return feedback == null ? NotFound() : Ok(feedback);
        }

        // POST api/<FeedbackController>
        [HttpPost]
        public async Task<ActionResult<FeedbackDto>> Post([FromBody] FeedbackPostModel feedback)
        {
            if (feedback == null) return BadRequest("Feedback data is required.");
            var feedbackDto = _mapper.Map<FeedbackDto>(feedback);
            feedbackDto.CreatedAt = DateTime.Now;
            feedbackDto = await _feedback.AddAsync(feedbackDto);
            return Ok(feedbackDto);
        }

        // PUT api/<FeedbackController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<FeedbackDto>> Put(int id, [FromBody] FeedbackPostModel feedback)
        {
            if (feedback == null) return BadRequest("Feedback data is required.");
            var feedbackDto = _mapper.Map<FeedbackDto>(feedback);
            feedbackDto = await _feedback.UpdateAsync(id, feedbackDto);
            return feedback == null ? NotFound() : Ok(feedback);
        }

        // DELETE api/<FeedbackController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (await _feedback.GetByIdAsync(id) == null) return NotFound();
            return Ok(await _feedback.RemoveAsync(id));
        }
    }
}