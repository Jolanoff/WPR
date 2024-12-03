﻿using Microsoft.AspNetCore.Identity;

namespace backend.Seeders
{
    public static class SeedRoles
    {
        public static async Task Seed(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            string[] roles = { "Admin", "BackOfficeMedewerker", "FrontOfficeMedewerker", "ParticuliereHuurder", "ZakelijkeHuurder", "Wagenparkbeheerder", "Bedrijf" };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }
        }
    }
}
    