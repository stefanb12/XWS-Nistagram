using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PostMicroservice.Database;
using PostMicroservice.Messaging;
using PostMicroservice.Repository;
using PostMicroservice.Service;

namespace PostMicroservice
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

            services.AddCors();

            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                     options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.Configure<MongoDbSettings>(
                Configuration.GetSection(nameof(MongoDbSettings)));

            services.AddSingleton<IMongoDbSettings>(sp =>
                sp.GetRequiredService<IOptions<MongoDbSettings>>().Value);

            services.AddSingleton<IMongoDbContext, MongoDbContext>();

            services.AddSingleton<IPostCreatedMessageSender, PostCreatedMessageSender>();

            services.AddSingleton<IProfileRepository, ProfileRepository>();
            services.AddSingleton<IProfileService, ProfileService>();

            services.AddSingleton<IPostRepository, PostRepository>();
            services.AddSingleton<IPostService, PostService>();

            string hostedService = Environment.GetEnvironmentVariable("HOSTED_SERVICE") ?? "true";
            if (hostedService == "true")
            {
                services.AddHostedService<ProfileCreatedMessageReceiver>();
                services.AddHostedService<ProfileUpdatedMessageReceiver>();
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            string staticFiles = Environment.GetEnvironmentVariable("STATIC_FILES") ?? "true";
            if (staticFiles == "true")
            {
                app.UseStaticFiles(new StaticFileOptions
                {
                    FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "wwwroot")),
                    RequestPath = "/wwwroot"
                });
            }

            app.UseStaticFiles();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
