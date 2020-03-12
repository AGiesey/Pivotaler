using Data;
using Data.Entities.Identity;
using Infrastructure;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using AutoMapper;
using Infrastructure.PivotalApi;

namespace Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<PostgressDbContext>(options => 
                options.UseNpgsql(Configuration.GetConnectionString("PostgresContext")));

            services.AddAutoMapper(typeof(Startup));

            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    builder.WithOrigins("http://localhost:3000")
                                        .AllowAnyHeader() // TODO: maybe specify headers if security risk?
                                        .AllowCredentials() // TODO: docs say this is a risk, but I'm not allowing any origin so maybe ok
                                        .AllowAnyMethod();
                });
            });

            services.AddIdentityCore<User>(options => { });
            services.AddScoped<IUserStore<User>, UserStore>();

            services.AddScoped<IJsonService, JsonService>();
            services.AddScoped<IStoryApiCalls, StoryApiCalls>();
            services.AddScoped<IBurndownApiCalls, BurndownApiCalls>();
            

            services.AddControllers();

            // TODO: I don't really know if I actually need options.LoginPath
            // TODO: this authentication is for the birds, try JWT or Bearer token
            services.AddAuthentication("cookies")
                .AddCookie("cookies", options => {
                    options.LoginPath = "/login";
                    // TODO: Expire the cookie? options.ExpireTimeSpan 
                });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(MyAllowSpecificOrigins);

            // app.UseHttpsRedirection();
            
            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
