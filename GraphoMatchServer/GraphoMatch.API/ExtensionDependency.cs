using GraphoMatch.Core;
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
            services.AddScoped<IService<UserDto>, UserService>();
            services.AddScoped<IUserRepository,UserRepository>();

            services.AddScoped<IHandWritingService,HandWritingService>();
            services.AddScoped<IHandWritingRepository,HandWritingRepository>();

            services.AddScoped<IJobService, JobService>();
            services.AddScoped<IJobRepository, JobRepository>();

            services.AddScoped<IService<FeedbackDto>, FeedbackService>();
            services.AddScoped<IFeedbackRepository,FeedbackRepository>();

            services.AddScoped<IAuthService, AuthService>();

            services.AddScoped<IRoleRepository, RoleRepository>();

            services.AddScoped<IManagerRepository,ManagerRepository>();
            services.AddScoped(typeof(IRepository<>),typeof(Repository<>));

            services.AddDbContext<DataContext>();
            services.AddScoped<DataContext>();
            services.AddControllers();
            services.AddAutoMapper(typeof(MappingPostProfile));
            services.AddAutoMapper(typeof(MappingProfile));

            services.AddHttpClient<IHandWritingService, HandWritingService>();
        }
    }
}
