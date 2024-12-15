using backend.Models.Gebruiker;
using Microsoft.AspNetCore.Identity;

namespace backend.Seeders
{
    public static class SeedAdmin
    {
        public static async Task Seed(IServiceProvider serviceProvider)
        {
            try
            {
                var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
                var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                var adminRole = "Admin";
                var adminEmail = "admin@admin.com";
                var adminPass = "Admin563-";

                // Create Admin Role if it doesn't exist
                if (!await roleManager.RoleExistsAsync(adminRole))
                {
                    await roleManager.CreateAsync(new IdentityRole(adminRole));
                    Console.WriteLine($"Role '{adminRole}' created.");
                }

                // Check if Admin User exists
                var adminUser = await userManager.FindByEmailAsync(adminEmail);
                if (adminUser == null)
                {
                    var newAdmin = new User
                    {
                        UserName = adminEmail,
                        Email = adminEmail,
                        Voornaam = "Admin",
                        Achternaam = "User",
                        EmailConfirmed = true
                    };

                    var userResult = await userManager.CreateAsync(newAdmin, adminPass);
                    if (userResult.Succeeded)
                    {
                        await userManager.AddToRoleAsync(newAdmin, adminRole);
                        Console.WriteLine("Admin user created successfully.");
                    }
                    else
                    {
                        Console.WriteLine($"Failed to create admin user: {string.Join(", ", userResult.Errors.Select(e => e.Description))}");
                    }
                }
                else
                {
                    Console.WriteLine("Admin user already exists.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during admin seeding: {ex.Message}");
            }
        }
    }
}
