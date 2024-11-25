using backend.Models.Gebruiker;
using Microsoft.EntityFrameworkCore;

namespace backend.Extentions
{
    public static class MigrationExtentions
    {
        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using IServiceScope scope = app.ApplicationServices.CreateScope();
            using ApplicationsDbContext context = scope.ServiceProvider.GetRequiredService<ApplicationsDbContext>();
            context.Database.Migrate();
        }
    }
}
