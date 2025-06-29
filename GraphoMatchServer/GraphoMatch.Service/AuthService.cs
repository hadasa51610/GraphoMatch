﻿using AutoMapper;
using GraphoMatch.Core.DTOs;
using GraphoMatch.Core.Models;
using GraphoMatch.Core.Repositories;
using GraphoMatch.Core.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Org.BouncyCastle.Crypto.Generators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphoMatch.Service
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IManagerRepository _managerRepository;

        public AuthService(IConfiguration configuration, IManagerRepository manager, IMapper mapper)
        {
            _configuration = configuration;
            _managerRepository = manager;
            _mapper = mapper;
        }

        public string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            };

            foreach (var role in user.Roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.RoleName));
            }

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(3),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<UserDto> ValidateUser(string userEmail, string password)
        {
            var user = await _managerRepository._users.GetByEmailAsync(userEmail);
            return (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password)) ? _mapper.Map<UserDto>(user) : null;
        }

        public async Task<LoginResDto> LoginAsync(string userEmail, string password)
        {
            var user = await ValidateUser(userEmail, password);
            if (user != null)
            {
                var token = GenerateJwtToken(_mapper.Map<User>(user));
                return new LoginResDto
                {
                    User = _mapper.Map<UserDto>(user),
                    Token = token
                };
            }
            return null;
        }

        public async Task<LoginResDto> RegisterAsync(UserDto userDto)
        {
            var userByEmail = await _managerRepository._users.GetByEmailAsync(userDto.Email);
            if (userByEmail != null)
            {
                return null;
            }

            var user = new User
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
                Profession = userDto.Profession,
            };
            user.Roles.Add(new Role { RoleName = "User" });

            user = await _managerRepository._users.AddAsync(user);
            if (user == null)
            {
                return null;
            };
            await _managerRepository.SaveAsync();
            var token = GenerateJwtToken(user);
            return new LoginResDto
            {
                User = _mapper.Map<UserDto>(user),
                Token = token
            };
        }
    }
}