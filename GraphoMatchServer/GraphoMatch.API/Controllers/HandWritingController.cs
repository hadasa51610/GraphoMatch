﻿using AutoMapper;
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
    public class HandWritingController : ControllerBase
    {
        private readonly IHandWritingService _handWriting;
        private readonly IMapper _mapper;

        public HandWritingController(IHandWritingService handWriting, IMapper mapper)
        {
            _handWriting = handWriting;
            _mapper = mapper;
        }


        // GET: api/<HandWritingController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HandWritingDto>>> Get()
        {
            var handWritings = await _handWriting.GetAsync();
            return handWritings == null ? NotFound() : Ok(handWritings);
        }

        // GET api/<HandWritingController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HandWritingDto>> Get(int id)
        {
            var handWriting = await _handWriting.GetByIdAsync(id);
            return handWriting == null ? NotFound() : Ok(handWriting);
        }

        // GET api/<HandWritingController>/5
        [HttpGet("ByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<HandWritingDto>>> GetByUserId(int userId)
        {
            var handWritings = await _handWriting.GetByUserId(userId);
            return handWritings == null ? NotFound() : Ok(handWritings);
        }

        // POST api/<HandWritingController>
        [HttpPost]
        public async Task<ActionResult<HandWritingDto>> Post([FromForm] HandWritingPostModel handWriting)
        {
            if (handWriting == null) return BadRequest("HandWriting data is required");
            var dto = _mapper.Map<HandWritingDto>(handWriting);
            dto.UploadedAt = DateTime.Now;
            dto = await _handWriting.AddAsync(dto,handWriting.ImageFile);
            return Ok(dto);
        }

        // PUT api/<HandWritingController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<HandWritingDto>> Put(int id, [FromBody] HandWritingPostModel handWriting)
        {
            if (handWriting == null) return BadRequest("HandWriting data is required");
            var dto = _mapper.Map<HandWritingDto>(handWriting);
            dto = await _handWriting.UpdateAsync(id, dto);
            return dto == null ? NotFound() : Ok(dto);
        }

        // DELETE api/<HandWritingController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (await _handWriting.GetByIdAsync(id) == null) return NotFound();
            return Ok(await _handWriting.RemoveAsync(id));
        }

        [HttpPost("analyze")]
        public async Task<IActionResult> Analyze([FromBody] int userId)
        {
            try
            {
                var result = await _handWriting.AnalyzeHandwritingAsync(userId);
                return Ok(result);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, $"Error calling Python service: {ex.Message}");
            }
        }
    }
}