using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using DESNEA.VirazonCore.App.Entidades.Inferfaces.Configuracion;
using DESNEA.VirazonCore.App.Entidades.Configuracion;

namespace DESNEA_VirazonCore
{
    public class Program
    {

        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .ConfigureAppConfiguration((hostContext, config) =>
                {
                    // delete all default configuration providers
                    config.Sources.Clear();
                    config.SetBasePath(hostContext.HostingEnvironment.ContentRootPath)
                        .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                        .AddJsonFile($"appsettings.{hostContext.HostingEnvironment.EnvironmentName}.json", optional: true)                    
                        .AddEnvironmentVariables();
                    //CurrentEnvironment = env;
                }).ConfigureLogging((hostContext, logging) => {
                    logging.AddConsole();
                    logging.AddDebug();                    
                })
                .Build();
    }
}
