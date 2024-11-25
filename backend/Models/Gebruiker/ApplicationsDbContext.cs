using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Gebruiker
{
    public class ApplicationsDbContext : IdentityDbContext<User>
    {
        public ApplicationsDbContext(DbContextOptions<ApplicationsDbContext> options) : base(options) { 
        
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<User>().Property(u => u.initials).HasMaxLength(5);
            builder.HasDefaultSchema("identity");
        }
    }
}
