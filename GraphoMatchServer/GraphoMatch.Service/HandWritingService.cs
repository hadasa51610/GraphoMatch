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
    public class HandWritingService : IService<HandWritingDto>, IHandWritingService
    {
        private readonly IManagerRepository _manager;
        private readonly IMapper _mapper;

        public HandWritingService(IManagerRepository manager, IMapper mapper)
        {
            _manager = manager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HandWritingDto>> GetAsync()
        {
            var handWritings = await _manager._handWriting.GetAllAsync();
            return _mapper.Map<IEnumerable<HandWritingDto>>(handWritings);
        }

        public async Task<HandWritingDto?> GetByIdAsync(int id)
        {
            var handWriting = await _manager._handWriting.GetByIdAsync(id);
            return _mapper.Map<HandWritingDto>(handWriting);
        }

        public async Task<HandWritingDto?> GetByUserId(int userId)
        {
            var handWriting = await _manager._handWriting.GetByUserId(userId);
            return _mapper.Map<HandWritingDto>(handWriting);
        }

        public async Task<bool> RemoveAsync(int id)
        {
            var analysis=await _manager._analysis.GetByHandWritingIdAsync(id);
            if (analysis != null)
            {
                var handwriting = await _manager._analysis.DeleteAsync(analysis.Id);
                if (handwriting) await _manager.SaveAsync();
            }
            bool deleted = await _manager._handWriting.DeleteAsync(id);
            if (deleted) await _manager.SaveAsync();
            return deleted;
        }

        public async Task<HandWritingDto> UpdateAsync(int id, HandWritingDto entity)
        {
            var dto = _mapper.Map<HandWriting>(entity);
            dto.Analysis = await _manager._analysis.GetByHandWritingIdAsync(id);
            if (dto != null) await _manager.SaveAsync();
            return _mapper.Map<HandWritingDto>(dto);
        }

        public async Task<HandWritingDto> AddAsync(HandWritingDto entity)
        {
            var dto = _mapper.Map<HandWriting>(entity);
            dto.Analysis = null;
            dto = await _manager._handWriting.AddAsync(dto);
            if (dto != null) await _manager.SaveAsync();
            return _mapper.Map<HandWritingDto>(dto);
        }
    }
}