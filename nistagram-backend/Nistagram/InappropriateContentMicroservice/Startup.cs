using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InappropriateContentMicroservice.Database;
using InappropriateContentMicroservice.Messaging;
using InappropriateContentMicroservice.Repository;
using InappropriateContentMicroservice.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace InappropriateContentMicroservice
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                     options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddDbContext<InappropriateContentDbContext>(options =>
               options.UseMySql(CreateConnectionStringFromEnvironment()).UseLazyLoadingProxies(), ServiceLifetime.Transient);

            var hostName = Environment.GetEnvironmentVariable("RABBITMQ_HOST_NAME") ?? "localhost";
            if (hostName == "rabbitmq")
            {             
                services.AddScoped<IMessageReceiver, ProfileCreatedMessageReceiver>();
                services.AddScoped<IMessageReceiver, ProfileUpdatedMessageReceiver>();
                services.AddScoped<IMessageReceiver, PostCreatedMessageReceiver>();
                services.AddScoped<IMessageReceiver, StoryCreatedMessageReceiver>();
            }

            services.AddScoped<IInappropriateContentRepository, InappropriateContentRepository>();
            services.AddScoped<IProfileRepository, ProfileRepository>();
            services.AddScoped<IPostRepository, PostRepository>();
            services.AddScoped<IStoryRepository, StoryRepository>();

            services.AddScoped<IInappropriateContentService, InappropriateContentService>();
            services.AddScoped<IProfileService, ProfileService>();
            services.AddScoped<IPostService, PostService>();
            services.AddScoped<IStoryService, StoryService>();

            string hostedService = Environment.GetEnvironmentVariable("HOSTED_SERVICE") ?? "true";
            if (hostedService == "true")
            {
                services.AddHostedService<ProfileCreatedMessageReceiver>();
                services.AddHostedService<ProfileUpdatedMessageReceiver>();
                services.AddHostedService<PostCreatedMessageReceiver>();
                services.AddHostedService<StoryCreatedMessageReceiver>();
            }
        }

        private string CreateConnectionStringFromEnvironment()
        {
            string server = Environment.GetEnvironmentVariable("DATABASE_HOST") ?? "localhost";
            string port = Environment.GetEnvironmentVariable("DATABASE_PORT") ?? "3306";
            string database = Environment.GetEnvironmentVariable("DATABASE_SCHEMA") ?? "InappropriateContentMicroserviceDb";
            string user = Environment.GetEnvironmentVariable("DATABASE_USERNAME") ?? "root";
            string password = Environment.GetEnvironmentVariable("DATABASE_PASSWORD") ?? "root";
            string sslMode = Environment.GetEnvironmentVariable("DATABASE_SSL_MODE") ?? "None";
            return $"server={server};port={port};database={database};user={user};password={password};";
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
