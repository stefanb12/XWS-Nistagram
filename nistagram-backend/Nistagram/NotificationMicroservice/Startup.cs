using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NotificationMicroservice.Database;
using NotificationMicroservice.Messaging;
using NotificationMicroservice.Repository;
using NotificationMicroservice.Service;

namespace NotificationMicroservice
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

            services.AddDbContext<NotificationDbContext>(options =>
                options.UseMySql(CreateConnectionStringFromEnvironment()).UseLazyLoadingProxies(), ServiceLifetime.Transient);

            var hostName = Environment.GetEnvironmentVariable("RABBITMQ_HOST_NAME") ?? "localhost";
            if (hostName == "rabbitmq")
            {
                services.AddSingleton<IMessageReceiver, PostCreatedMessageReceiver>();
                services.AddSingleton<IMessageReceiver, ProfileCreatedMessageReceiver>();
                services.AddSingleton<IMessageReceiver, ProfileUpdatedMessageReceiver>();
            }

            services.AddSingleton<INotificationService, NotificationService>(service =>
                    new NotificationService(new NotificationRepository(new NotificationDbContext())));
            services.AddSingleton<IProfileService, ProfileService>(service =>
                    new ProfileService(new ProfileRepository(new NotificationDbContext())));
            services.AddSingleton<IPostService, PostService>(service =>
                    new PostService(new PostRepository(new NotificationDbContext())));

            string hostedService = Environment.GetEnvironmentVariable("HOSTED_SERVICE") ?? "true";
            if (hostedService == "true")
            {
                services.AddHostedService<ProfileCreatedMessageReceiver>();
                services.AddHostedService<ProfileUpdatedMessageReceiver>();
                services.AddHostedService<PostCreatedMessageReceiver>();
            }
        }

        private string CreateConnectionStringFromEnvironment()
        {
            string server = Environment.GetEnvironmentVariable("DATABASE_HOST") ?? "localhost";
            string port = Environment.GetEnvironmentVariable("DATABASE_PORT") ?? "3306";
            string database = Environment.GetEnvironmentVariable("DATABASE_SCHEMA") ?? "NotificationMicroserviceDb";
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
