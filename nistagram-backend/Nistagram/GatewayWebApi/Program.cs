using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace GatewayWebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            string purpose = Environment.GetEnvironmentVariable("PURPOSE") ?? "dev";
            return WebHost.CreateDefaultBuilder(args)
            .ConfigureAppConfiguration((host, config) =>
            {
                if (purpose == "dev")
                    config.AddJsonFile("configuration.json");
                else
                    config.AddJsonFile($"configuration-{purpose}.json");
            })
            .UseStartup<Startup>();
        }
    }
}
