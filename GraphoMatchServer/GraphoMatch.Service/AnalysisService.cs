using AutoMapper;
using GraphoMatch.Core.DTOs;
using GraphoMatch.Core.Models;
using GraphoMatch.Core.Repositories;
using GraphoMatch.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace GraphoMatch.Service
{
    public class AnalysisService : IService<AnalysisDto>, IAnalysisService
    {
        private readonly IManagerRepository _managerRepository;
        private readonly IMapper _mapper;
        private readonly HttpClient _httpClient;

        public AnalysisService(IManagerRepository managerRepository, IMapper mapper, HttpClient httpClient)
        {
            _managerRepository = managerRepository;
            _mapper = mapper;
            _httpClient = httpClient;
        }
        public async Task<IEnumerable<AnalysisDto>> GetAsync()
        {
            var analysis = await _managerRepository._analysis.GetAllAsync();
            return _mapper.Map<IEnumerable<AnalysisDto>>(analysis);
        }

        public async Task<AnalysisDto?> GetByIdAsync(int id)
        {
            var analysis = await _managerRepository._analysis.GetByIdAsync(id);
            return _mapper.Map<AnalysisDto>(analysis);
        }

        public async Task<AnalysisDto?> GetByHandWritingIdAsync(int handwritingId)
        {
            var analysis = await _managerRepository._analysis.GetByHandWritingIdAsync(handwritingId);
            return _mapper.Map<AnalysisDto>(analysis);
        }

        public async Task<bool> RemoveAsync(int id)
        {
            bool deleted = await _managerRepository._analysis.DeleteAsync(id);
            if (deleted) await _managerRepository.SaveAsync();
            return deleted;
        }

        public async Task<AnalysisDto> UpdateAsync(int id, AnalysisDto entity)
        {
            var analysisDto = _mapper.Map<Analysis>(entity);
            analysisDto = await _managerRepository._analysis.UpdateAsync(id, analysisDto);
            if (analysisDto != null) await _managerRepository.SaveAsync();
            return _mapper.Map<AnalysisDto>(analysisDto);
        }

        public async Task<AnalysisDto> AddAsync(AnalysisDto entity)
        {
            var analysisDto = _mapper.Map<Analysis>(entity);
            analysisDto = await _managerRepository._analysis.AddAsync(analysisDto);
            if (analysisDto != null) await _managerRepository.SaveAsync();
            return _mapper.Map<AnalysisDto>(analysisDto);
        }

        public async Task<string> AnalyzeHandwritingAsync(int userId)
        {
            var handwriting = await _managerRepository._handWriting.GetByUserId(userId);
            if(handwriting == null || !handwriting.Any()) { return null; }
            var analysis = await _managerRepository._analysis.GetByHandWritingIdAsync(handwriting.First().Id);
            if (analysis != null)
                return analysis.AnalysisResult.ToString();
            var requestData = new
            {
                imageUrl = handwriting.First().Url
            };

            var json = JsonSerializer.Serialize(requestData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("http://192.168.0.111:5000/analyze", content);
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsStringAsync();
            analysis = new Analysis { AnalysisResult = result, HandWritingId = handwriting.First().Id };
            return result;
        }

    }
}