using backend.DbContext;
using backend.Seeders;
using backend.Models.Gebruiker;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text;
using backend.Services;
using Microsoft.Extensions.FileProviders;

namespace backend
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // CORS Configuration
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
            });

            // Add services to the container
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add Identity and Database Context
            builder.Services.AddDbContext<ApplicationsDbContext>(options =>
                options.UseSqlite("Data Source=database.db"));



            // Configure Services
            builder.Services.AddScoped<EmailService>();
            builder.Services.AddScoped<AccountService>();
            builder.Services.AddScoped<AuthService>();
            builder.Services.AddScoped<BedrijfService>();
            builder.Services.AddScoped<BedrijfMedewerkerService>();
            builder.Services.AddScoped<AdminService>();
            builder.Services.AddScoped<SchademeldingenService>();
            builder.Services.AddScoped<VoertuigService>();
            builder.Services.AddScoped<HuurAanvraagService>();




            builder.Services.AddIdentity<User, IdentityRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 6;
            })
            .AddRoles<IdentityRole>()
            .AddSignInManager<SignInManager<User>>()
            .AddEntityFrameworkStores<ApplicationsDbContext>()
            .AddDefaultTokenProviders();

           

            // Configure Cookie Authentication
            builder.Services.ConfigureApplicationCookie(options =>
            {
                options.ExpireTimeSpan = TimeSpan.FromMinutes(5);
                options.SlidingExpiration = true;

                options.Cookie.HttpOnly = true;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always; 

                options.LoginPath = "/auth/login";
                options.AccessDeniedPath = "/auth/access-denied";

                options.ExpireTimeSpan = TimeSpan.FromHours(1);
                options.Cookie.SameSite = SameSiteMode.None;

                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
                options.Events.OnRedirectToAccessDenied = context =>
                {
                    context.Response.StatusCode = 403;
                    return Task.CompletedTask;
                };
            });

            builder.Services.AddAuthorization();

            var app = builder.Build();

            // Configure middleware pipeline
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("AllowReactApp");
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseStaticFiles();

            string uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");

            if (!Directory.Exists(uploadsPath)) 
            {
                Directory.CreateDirectory(uploadsPath);
            }

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(uploadsPath),
                RequestPath = "/uploads"
            });

            // Seed Roles
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<ApplicationsDbContext>();

                try
                {
                    Console.WriteLine("seeding database");


                    await SeedRoles.Seed(services);
                    await SeedAutos.Seed(services);
                    await SeedCampers.Seed(services);
                    await SeedCaravans.Seed(services);
                    await SeedAdmin.Seed(services);

                    Console.WriteLine("completed seeding");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error while seeding roles: {ex.Message}");
                }
            }


            app.MapControllers();
            await app.RunAsync();
        }
    }
}