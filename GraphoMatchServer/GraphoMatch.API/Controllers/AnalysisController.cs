﻿using AutoMapper;
using GraphoMatch.API.Models;
using GraphoMatch.Core.DTOs;
using GraphoMatch.Core.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GraphoMatch.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalysisController : ControllerBase
    {
        private readonly IService<AnalysisDto> _analysis;
        private readonly IMapper _mapper;

        public AnalysisController(IService<AnalysisDto> analysis, IMapper mapper)
        {
            _analysis = analysis;
            _mapper = mapper;
        }

        // GET: api/<AnalysisController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnalysisDto>>> Get()
        {
            var analysis = await _analysis.GetAsync();
            return analysis == null ? NoContent() : Ok(analysis);
        }

        // GET api/<AnalysisController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AnalysisDto>> Get(int id)
        {
            var analysis = await _analysis.GetByIdAsync(id);
            return analysis == null ? NotFound() : Ok(analysis);
        }

        // POST api/<AnalysisController>
        [HttpPost]
        public async Task<ActionResult<AnalysisDto>> Post([FromBody] AnalysisPostModel analysis)
        {
            if (analysis == null) return BadRequest("Analysis data is required.");
            var analysisDto = _mapper.Map<AnalysisDto>(analysis);
            analysisDto.AnalysisDate = DateTime.Now;
            analysisDto = await _analysis.AddAsync(analysisDto);
            return Ok(analysisDto);
        }

        // PUT api/<AnalysisController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<AnalysisDto>> Put(int id, [FromBody] AnalysisPostModel analysis)
        {
            if (analysis == null) return BadRequest("Analysis data is required.");
            var analysisDto = _mapper.Map<AnalysisDto>(analysis);
            analysisDto = await _analysis.UpdateAsync(id, analysisDto);
            return analysisDto == null ? NotFound() : Ok(analysisDto);
        }

        // DELETE api/<AnalysisController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (await _analysis.GetByIdAsync(id) == null) return NotFound();
            return Ok(await _analysis.RemoveAsync(id));
        }
    }
}