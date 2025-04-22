using AutoMapper;
using CloudinaryDotNet;
using GraphoMatch.Core.DTOs;
using GraphoMatch.Core.Models;
using GraphoMatch.Core.Repositories;
using GraphoMatch.Core.Services;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Service
{
    public class HandWritingService : IHandWritingService
    {
        private readonly IManagerRepository _manager;
        private readonly IMapper _mapper;
        readonly CloudinaryService _cloudinaryService = new CloudinaryService();


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

        public async Task<IEnumerable<HandWritingDto>> GetByUserId(int userId)
        {
            var handWritings = await _manager._handWriting.GetByUserId(userId);
            return _mapper.Map<IEnumerable<HandWritingDto>>(handWritings);
        }

        public async Task<bool> RemoveAsync(int id)
        {
            var analysis = await _manager._analysis.GetByHandWritingIdAsync(id);
            if (analysis != null)
            {
                var deleted = await _manager._analysis.DeleteAsync(analysis.Id);
                if (deleted) await _manager.SaveAsync();
            }
            var handwriting = await _manager._handWriting.GetByIdAsync(id);
            bool succeed = await _manager._handWriting.DeleteAsync(id);
            if (succeed) await _manager.SaveAsync();
            return succeed;
        }

        public async Task<HandWritingDto> AddAsync(HandWritingDto entity, IFormFile image)
        {
            // טען את הקובץ הקיים לפי UserId
            var existing = await _manager._handWriting.GetByUserId(entity.UserId);

            // אם קיים – מחק מהDB ומהענן
            if (existing != null)
            {
                foreach (var item in existing)
                {
                    // מחיקת ניתוח אם יש
                    var analysis = await _manager._analysis.GetByHandWritingIdAsync(item.Id);
                    if (analysis != null)
                    {
                        await _manager._analysis.DeleteAsync(analysis.Id);
                    }
                    // מחיקת קובץ מהענן
                    if (!string.IsNullOrEmpty(item.Url) && item.Type == entity.Type)
                    {
                        await _cloudinaryService.DeleteFileAsync(item.Url);
                    }

                    // מחיקת רשומת הטופס
                    if (item.Type == entity.Type)
                    {
                        await _manager._handWriting.DeleteAsync(item.Id);
                    }
                    await _manager.SaveAsync();
                }
            }

            // העלאת קובץ חדש לענן
            var url = await _cloudinaryService.UploadFileAsync(image, entity.UserId, entity.Type);
            if (url == null)
                return null;

            // מיפוי והוספה
            var newEntity = _mapper.Map<HandWriting>(entity);
            newEntity.Url = url.ToString();
            newEntity.User = await _manager._users.GetByIdAsync(entity.UserId);
            newEntity.Analysis = null;

            var added = await _manager._handWriting.AddAsync(newEntity);
            if (added != null) await _manager.SaveAsync();

            return _mapper.Map<HandWritingDto>(added);
        }


        public Task<HandWritingDto> UpdateAsync(int id, HandWritingDto entity)
        {
            throw new NotImplementedException();
        }

        public Task<HandWritingDto> AddAsync(HandWritingDto entity)
        {
            throw new NotImplementedException();
        }
    }
}