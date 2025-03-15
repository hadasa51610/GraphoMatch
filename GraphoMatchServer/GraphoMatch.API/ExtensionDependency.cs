﻿using GraphoMatch.Core;
using GraphoMatch.Core.DTOs;
using GraphoMatch.Core.Models;
using GraphoMatch.Core.Repositories;
using GraphoMatch.Core.Services;
using GraphoMatch.Data;
using GraphoMatch.Data.Repositories;
using GraphoMatch.Service;

namespace GraphoMatch.API
{
    public static class ExtensionDependency
    {
        public static void AddDependency(this IServiceCollection services)
        {
            services.AddScoped<IService<UserDto>,UserService>();
            services.AddScoped<IUserRepository,UserRepository>();

            services.AddScoped<IService<HandWritingDto>,HandWritingService>();
            services.AddScoped<IHandWritingRepository,HandWritingRepository>();

            services.AddScoped<IService<AnalysisDto>,AnalysisService>();
            services.AddScoped<IAnalysisRepository,AnalysisRepository>();

            services.AddScoped<IService<FeedbackDto>,FeedbackService>();
            services.AddScoped<IFeedbackRepository,FeedbackRepository>();

            services.AddScoped<IManagerRepository,ManagerRepository>();
            services.AddScoped(typeof(IRepository<>),typeof(Repository<>));

            services.AddDbContext<DataContext>();
            services.AddControllers();
            services.AddAutoMapper(typeof(MappingProfile), typeof(MappingPostProfile));
            services.AddAutoMapper(typeof(MappingProfile));
        }
    }
}
