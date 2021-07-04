using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CampaignMicroservice.Database;
using CampaignMicroservice.Messaging;
using CampaignMicroservice.Repository;
using CampaignMicroservice.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace CampaignMicroservice
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

            services.AddDbContext<CampaignDbContext>(options =>
               options.UseMySql(CreateConnectionStringFromEnvironment()).UseLazyLoadingProxies(), ServiceLifetime.Transient);

            var hostName = Environment.GetEnvironmentVariable("RABBITMQ_HOST_NAME") ?? "localhost";
            if (hostName == "rabbitmq")
            {
                services.AddScoped<IMessageReceiver, ProfileCreatedMessageReceiver>();
                services.AddScoped<IMessageReceiver, ProfileUpdatedMessageReceiver>();
            }

            services.AddScoped<IProfileRepository, ProfileRepository>();
            services.AddScoped<ICommercialRepository, CommercialRepository>();
            services.AddScoped<ISingleCampaignRepository, SingleCampaignRepository>();
            services.AddScoped<IRepeatableCampaignRepository, RepeatableCampaignRepository>();
            services.AddScoped<ICampaignRequestRepository, CampaignRequestRepository>();

            services.AddScoped<IProfileService, ProfileService>();
            services.AddScoped<ICommercialService, CommercialService>();
            services.AddScoped<ISingleCampaignService, SingleCampaignService>();
            services.AddScoped<IRepeatableCampaignService, RepeatableCampaignService>();
            services.AddScoped<ICampaignRequestService, CampaignRequestService>();


            services.AddHostedService<ProfileCreatedMessageReceiver>();
            services.AddHostedService<ProfileUpdatedMessageReceiver>();
        }

        private string CreateConnectionStringFromEnvironment()
        {
            string server = Environment.GetEnvironmentVariable("DATABASE_HOST") ?? "localhost";
            string port = Environment.GetEnvironmentVariable("DATABASE_PORT") ?? "3306";
            string database = Environment.GetEnvironmentVariable("DATABASE_SCHEMA") ?? "CampaignMicroserviceDb";
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
