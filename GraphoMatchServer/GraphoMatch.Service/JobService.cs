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
    public class JobService : IService<JobDTO>, IJobService
    {
        private readonly IManagerRepository _managerRepository;
        private readonly IMapper _mapper;
        public JobService(IManagerRepository repository, IMapper mapper)
        {
            _managerRepository = repository;
            _mapper = mapper;
        }

        public async Task<JobDTO> AddAsync(JobDTO entity)
        {
            var jobDto = _mapper.Map<Job>(entity);
            jobDto = await _managerRepository._jobs.AddAsync(jobDto);
            if (jobDto != null)
            {
                await _managerRepository.SaveAsync();
            }
            return _mapper.Map<JobDTO>(jobDto);
        }

        public async Task<IEnumerable<UserDto>> GetAllSeekers(int id)
        {
            var users = await _managerRepository._jobs.GetAllSeekers(id);
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<bool> RemoveAsync(int id)
        {
            bool deleted = await _managerRepository._jobs.DeleteAsync(id);
            if (deleted) await _managerRepository.SaveAsync();
            return deleted;
        }

        public async Task<JobDTO> UpdateAsync(int id, JobDTO entity)
        {
            var jobDto = _mapper.Map<Job>(entity);
            jobDto = await _managerRepository._jobs.UpdateAsync(id, jobDto);
            if (jobDto != null)
            {
                await _managerRepository.SaveAsync();
            }
            return _mapper.Map<JobDTO>(jobDto);
        }

        public async Task<IEnumerable<JobDTO>> GetAsync()
        {
            var jobs = await _managerRepository._jobs.GetAllAsync();
            return _mapper.Map<IEnumerable<JobDTO>>(jobs);
        }

        public async Task<IEnumerable<JobDTO>> GetWithSeekersAsync()
        {
            var jobs = await _managerRepository._jobs.GetWithSeekersAsync();
            return _mapper.Map<IEnumerable<JobDTO>>(jobs);
        }

        public async Task<JobDTO?> GetByIdAsync(int id)
        {
            var job = await _managerRepository._jobs.GetByIdAsync(id);
            return _mapper.Map<JobDTO>(job);
        }

        public async Task<UserDto> AddSeeker(int id,int userId)
        {
            var user = await _managerRepository._users.GetByIdAsync(userId);
            if (user == null) return null;
            user = await _managerRepository._jobs.AddSeeker(id, user);
            if (user != null)
            {
                await _managerRepository.SaveAsync();
            }
            return _mapper.Map<UserDto>(user);
        }
    }
}