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
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace GraphoMatch.Service
{
    public class HandWritingService : IHandWritingService
    {
        private readonly IManagerRepository _manager;
        private readonly IMapper _mapper;
        private readonly HttpClient _httpClient;
        readonly CloudinaryService _cloudinaryService = new CloudinaryService();


        public HandWritingService(IManagerRepository manager, IMapper mapper, HttpClient httpClient)
        {
            _manager = manager;
            _mapper = mapper;
            _httpClient = httpClient;
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
            var handwriting = await _manager._handWriting.GetByIdAsync(id);
            bool succeed = await _manager._handWriting.DeleteAsync(id);
            if (succeed) await _manager.SaveAsync();
            return succeed;
        }

        public async Task<HandWritingDto> AddAsync(HandWritingDto entity, IFormFile image)
        {
            // Delete previous handwriting (if exists)
            await DeleteExistingHandwritingAsync(entity.UserId, entity.Type);

            // Upload new image
            var url = await _cloudinaryService.UploadFileAsync(image, entity.UserId, entity.Type);
            if (url == null)
                return null;

            // Map and add new handwriting
            var newEntity = _mapper.Map<HandWriting>(entity);
            newEntity.Url = url.ToString();
            newEntity.User = await _manager._users.GetByIdAsync(entity.UserId);
            newEntity.AnalysisResult = "none";

            var added = await _manager._handWriting.AddAsync(newEntity);
            if (added != null)
                await _manager.SaveAsync();

            return _mapper.Map<HandWritingDto>(added);
        }

        private async Task DeleteExistingHandwritingAsync(int userId, string type)
        {
            var existing = await _manager._handWriting.GetByUserId(userId);
            var toDelete = existing?.Where(x => x.Type == type).ToList();

            if (toDelete == null || toDelete.Count == 0)
                return;

            var deleteTasks = new List<Task>();

            foreach (var item in toDelete)
            {
                if (!string.IsNullOrEmpty(item.Url))
                    deleteTasks.Add(_cloudinaryService.DeleteFileAsync(item.Url));

                deleteTasks.Add(_manager._handWriting.DeleteAsync(item.Id));
            }

            await Task.WhenAll(deleteTasks);
            await _manager.SaveAsync();
        }


        public Task<HandWritingDto> UpdateAsync(int id, HandWritingDto entity)
        {
            throw new NotImplementedException();
        }

        public Task<HandWritingDto> AddAsync(HandWritingDto entity)
        {
            throw new NotImplementedException();
        }
        public async Task<string> AnalyzeHandwritingAsync(int userId)
        {
            var handwriting = await _manager._handWriting.GetByUserId(userId);
            if (handwriting == null || !handwriting.Any()) { return null; }
            var analysis = handwriting.First().AnalysisResult;
            if (analysis != "none" && analysis!="")
                return analysis;
            var requestData = new
            {
                imageUrl = handwriting.First().Url
            };

            var json = JsonSerializer.Serialize(requestData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("http://192.168.0.111:5000/analyze", content);
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsStringAsync();
            handwriting.First().AnalysisResult = result;
            await _manager.SaveAsync();

            return result;
        }
    }
}