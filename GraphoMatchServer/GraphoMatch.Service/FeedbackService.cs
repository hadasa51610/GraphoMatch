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
    public class FeedbackService : IService<FeedbackDto>, IFeedbackService
    {
        private readonly IManagerRepository _managerRepository;
        private readonly IMapper _mapper;

        public FeedbackService(IManagerRepository repository, IMapper mapper)
        {
            _managerRepository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<FeedbackDto>> GetAsync()
        {
            var feedbacks = await _managerRepository._feedback.GetAllAsync();
            return _mapper.Map<IEnumerable<FeedbackDto>>(feedbacks);
        }

        public async Task<FeedbackDto?> GetByIdAsync(int id)
        {
            var feedback = await _managerRepository._feedback.GetByIdAsync(id);
            return _mapper.Map<FeedbackDto>(feedback);
        }

        public async Task<FeedbackDto?> GetByUserIdAsync(int userId)
        {
            var feedback = await _managerRepository._feedback.GetByUserIdAsync(userId);
            return _mapper.Map<FeedbackDto>(feedback);
        }

        public async Task<FeedbackDto?> GetByAnalysisIdAsync(int analysisId)
        {
            var feedback = await _managerRepository._feedback.GetByAnalysisIdAsync(analysisId);
            return _mapper.Map<FeedbackDto>(feedback);
        }

        public async Task<bool> RemoveAsync(int id)
        {
            bool deleted = await _managerRepository._feedback.DeleteAsync(id);
            if (deleted) await _managerRepository.SaveAsync();
            return deleted;
        }

        public async Task<FeedbackDto> UpdateAsync(int id, FeedbackDto entity)
        {
            var feedbackDto = _mapper.Map<Feedback>(entity);
            feedbackDto = await _managerRepository._feedback.UpdateAsync(id, feedbackDto);
            if (feedbackDto != null) await _managerRepository.SaveAsync();
            return _mapper.Map<FeedbackDto>(feedbackDto);
        }

        public async Task<FeedbackDto> AddAsync(FeedbackDto entity)
        {
            var feedbackDto = _mapper.Map<Feedback>(entity);
            feedbackDto = await _managerRepository._feedback.AddAsync(feedbackDto);
            if (feedbackDto != null) await _managerRepository.SaveAsync();
            return _mapper.Map<FeedbackDto>(feedbackDto);
        }
    }
}