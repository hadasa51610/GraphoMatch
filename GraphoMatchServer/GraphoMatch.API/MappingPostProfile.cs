﻿using AutoMapper;
using GraphoMatch.API.Models;
using GraphoMatch.Core.DTOs;

namespace GraphoMatch.API
{
    public class MappingPostProfile : Profile
    {
        public MappingPostProfile()
        {
            CreateMap<UserPostModel, UserDto>();
            CreateMap<HandWritingPostModel, HandWritingDto>();
            CreateMap<FeedbackPostModel, FeedbackDto>();
            CreateMap<JobPostModel,JobDTO>();
        }
    }
}
