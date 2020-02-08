
using Data;
using Data.Models.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Web
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
            services.AddScoped<DbContext, PostgressDbContext>();
            
            services.AddDbContext<PostgressDbContext>(options => 
                options.UseNpgsql(Configuration.GetConnectionString("PostgresContext")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<PostgressDbContext>()
                .AddDefaultTokenProviders();

            // services.AddIdentityServer()
            //     .AddAspNetIdentity<ApplicationUser, IdentityRole>()
            //     .AddEntityFrameworkStores<PostgressDbContext>()
            //     .AddDefaultTokenProviders();
                
            //services.AddApiAuthorization<ApplicationUser, PostgressDbContext>();

            services.AddAuthentication();
            //     .AddIdentityServerJwt();

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseIdentityServer();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
