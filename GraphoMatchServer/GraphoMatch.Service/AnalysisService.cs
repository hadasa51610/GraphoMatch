using AutoMapper;
using GraphoMatch.Core.DTOs;
using GraphoMatch.Core.Models;
using GraphoMatch.Core.Repositories;
using GraphoMatch.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Service
{
    public class AnalysisService : IService<AnalysisDto>, IAnalysisService
    {
        private readonly IManagerRepository _managerRepository;
        private readonly IMapper _mapper;

        public AnalysisService(IManagerRepository managerRepository, IMapper mapper)
        {
            _managerRepository = managerRepository;
            _mapper = mapper;
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
            var feedback = await _managerRepository._feedback.GetByAnalysisIdAsync(id);
            if (feedback != null)
            {
                bool succeed = await _managerRepository._feedback.DeleteAsync(feedback.Id);
                if (succeed) await _managerRepository.SaveAsync();
            }
            bool deleted = await _managerRepository._analysis.DeleteAsync(id);
            if (deleted) await _managerRepository.SaveAsync();
            return deleted;
        }

        public async Task<AnalysisDto> UpdateAsync(int id, AnalysisDto entity)
        {
            var analysisDto = _mapper.Map<Analysis>(entity);
            analysisDto.Feedback = await _managerRepository._feedback.GetByAnalysisIdAsync(id);
            analysisDto = await _managerRepository._analysis.UpdateAsync(id, analysisDto);
            if (analysisDto != null) await _managerRepository.SaveAsync();
            return _mapper.Map<AnalysisDto>(analysisDto);
        }

        public async Task<AnalysisDto> AddAsync(AnalysisDto entity)
        {
            var analysisDto = _mapper.Map<Analysis>(entity);
            analysisDto.Feedback = null;
            analysisDto = await _managerRepository._analysis.AddAsync(analysisDto);
            if (analysisDto != null) await _managerRepository.SaveAsync();
            return _mapper.Map<AnalysisDto>(analysisDto);
        }
    }
}