using backend.Extentions;
using backend.Models.Gebruiker;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add Authentication and Authorization
            builder.Services.AddAuthentication().AddCookie(IdentityConstants.ApplicationScheme);
            builder.Services.AddAuthorization();

            // Add Identity and Database Context
            builder.Services.AddIdentityCore<User>()
                .AddEntityFrameworkStores<ApplicationsDbContext>()
                .AddApiEndpoints();

            builder.Services.AddDbContext<ApplicationsDbContext>(options =>
     options.UseMySQL(builder.Configuration.GetConnectionString("Database")));


            var app = builder.Build();

            // Configure middleware pipeline
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.ApplyMigrations(); // Custom extension for auto-migrations
            }

            app.UseHttpsRedirection();
            app.UseAuthentication(); // Ensure authentication middleware is added
            app.UseAuthorization();

            app.MapControllers();
            app.MapIdentityApi<User>();

            app.Run();
        }
    }
}
