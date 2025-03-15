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
    public class UserService : IService<UserDto>, IUserService
    {
        private readonly IManagerRepository _managerRepository;
        private readonly IMapper _mapper;
        public UserService(IManagerRepository repository, IMapper mapper)
        {
            _managerRepository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDto>> GetAsync()
        {
            var users = await _managerRepository._users.GetAllAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDto?> GetByIdAsync(int id)
        {
            var user = await _managerRepository._users.GetByIdAsync(id);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<bool> RemoveAsync(int id)
        {
            var feedbacks = await _managerRepository._feedback.GetByUserIdAsync(id);
            while (feedbacks != null)
            {
                bool succeed= await _managerRepository._feedback.DeleteAsync(feedbacks.Id);
                if(succeed) await _managerRepository.SaveAsync();
                feedbacks = await _managerRepository._feedback.GetByUserIdAsync(id);
            }
            var handwriting= await _managerRepository._handWriting.GetByUserId(id);
            while(handwriting != null)
            {
                bool succeed= await _managerRepository._handWriting.DeleteAsync(handwriting.Id);
                if(succeed) await _managerRepository.SaveAsync();
                handwriting=await _managerRepository._handWriting.GetByUserId(id);
            }
            bool deleted = await _managerRepository._users.DeleteAsync(id);
            if (deleted) await _managerRepository.SaveAsync();
            return deleted;
        }

        public async Task<UserDto> UpdateAsync(int id, UserDto entity)
        {
            var userDto = _mapper.Map<User>(entity);
            userDto = await _managerRepository._users.UpdateAsync(id, userDto);
            if (userDto != null) await _managerRepository.SaveAsync();
            return _mapper.Map<UserDto>(userDto);
        }

        public async Task<UserDto> AddAsync(UserDto entity)
        {
            var userDto = _mapper.Map<User>(entity);
            userDto = await _managerRepository._users.AddAsync(userDto);
            if (userDto != null) await _managerRepository.SaveAsync();
            return _mapper.Map<UserDto>(userDto);
        }
    }
}
