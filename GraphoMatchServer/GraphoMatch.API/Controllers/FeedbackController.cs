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
    public class FeedbackController : ControllerBase
    {
        private readonly IService<FeedbackDto> _feedback;
        private readonly IFeedbackService _feedbackService;
        private readonly IMapper _mapper;

        public FeedbackController(IService<FeedbackDto> service, IMapper mapper, IFeedbackService feedbackService)
        {
            _mapper = mapper;
            _feedback = service;
            _feedbackService = feedbackService;
        }


        [Authorize(Policy = "UserOrAdmin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FeedbackDto>>> Get()
        {
            var feedbacks = await _feedbackService.GetWithUsersAsync();
            return feedbacks == null ? NoContent() : Ok(feedbacks);
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpGet("{id}")]
        public  async Task<ActionResult<FeedbackDto>> Get(int id)
        {
            var feedback = await _feedback.GetByIdAsync(id);
            return feedback == null ? NotFound() : Ok(feedback);
        }

        [Authorize(Policy = "UserOrAdmin")]
        [HttpPost]
        public async Task<ActionResult<FeedbackDto>> Post([FromBody] FeedbackPostModel feedback)
        {
            if (feedback == null) return BadRequest("Feedback data is required.");
            var feedbackDto = _mapper.Map<FeedbackDto>(feedback);
            feedbackDto.CreatedAt = DateTime.Now;
            feedbackDto = await _feedback.AddAsync(feedbackDto);
            return Ok(feedbackDto);
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpPut("{id}")]
        public async Task<ActionResult<FeedbackDto>> Put(int id, [FromBody] FeedbackPostModel feedback)
        {
            if (feedback == null) return BadRequest("Feedback data is required.");
            var feedbackDto = _mapper.Map<FeedbackDto>(feedback);
            feedbackDto = await _feedback.UpdateAsync(id, feedbackDto);
            return feedback == null ? NotFound() : Ok(feedback);
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (await _feedback.GetByIdAsync(id) == null) return NotFound();
            return Ok(await _feedback.RemoveAsync(id));
        }
    }
}