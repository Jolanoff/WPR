using backend.Models.Gebruiker;
using backend.Models.Klanten;
using backend.Models.Klanten.Bedrijven;
using backend.Models.Medewerkers;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.DbContext
{
    public class ApplicationsDbContext : IdentityDbContext<User>
    {
        public ApplicationsDbContext(DbContextOptions<ApplicationsDbContext> options) : base(options) { }

        // DbSets
        public DbSet<Klant> Klanten { get; set; }
        public DbSet<ParticuliereHuurder> ParticuliereHuurders { get; set; }
        public DbSet<Bedrijf> Bedrijven { get; set; }
        public DbSet<WagenparkBeheerder> WagenparkBeheerders { get; set; }
        public DbSet<ZakelijkeHuurder> ZakelijkeHuurders { get; set; }
        public DbSet<Medewerker> Medewerkers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Gebruik standaard schema
            builder.HasDefaultSchema("applicationdb");

            // **Relatie User -> Klant**
            builder.Entity<User>()
                .HasOne(u => u.Klanten)
                .WithOne(k => k.User)
                .HasForeignKey<Klant>(k => k.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // **Relatie User -> Medewerker**
            builder.Entity<User>()
                .HasOne(u => u.Medewerker)
                .WithOne(m => m.User)
                .HasForeignKey<Medewerker>(m => m.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // **Relatie Klant -> Bedrijf**
            builder.Entity<Bedrijf>()
                .HasOne(b => b.Klant)
                .WithOne(k => k.Bedrijf)
                .HasForeignKey<Bedrijf>(b => b.KlantId)
                .OnDelete(DeleteBehavior.Cascade);

            // **Relatie Klant -> ParticuliereHuurder**
            builder.Entity<ParticuliereHuurder>()
                .HasOne(p => p.Klant)
                .WithOne(k => k.ParticuliereHuurder)
                .HasForeignKey<ParticuliereHuurder>(p => p.KlantId)
                .OnDelete(DeleteBehavior.Cascade);

            // **Relatie Klant -> ZakelijkeHuurder**
            builder.Entity<ZakelijkeHuurder>()
                .HasOne(z => z.Klant)
                .WithOne(k => k.ZakelijkeHuurder)
                .HasForeignKey<ZakelijkeHuurder>(z => z.KlantId)
                .OnDelete(DeleteBehavior.Cascade);

            // **Relatie Klant -> WagenparkBeheerder**
            builder.Entity<WagenparkBeheerder>()
                .HasOne(w => w.Klant)
                .WithOne(k => k.WagenparkBeheerder)
                .HasForeignKey<WagenparkBeheerder>(w => w.KlantId)
                .OnDelete(DeleteBehavior.Cascade);

            // **Relatie Bedrijf -> WagenparkBeheerders**
            builder.Entity<Bedrijf>()
                .HasMany(b => b.WagenparkBeheerders)
                .WithOne(w => w.Bedrijf)
                .HasForeignKey(w => w.BedrijfId)
                .OnDelete(DeleteBehavior.Cascade);

            // **Relatie Bedrijf -> ZakelijkeHuurders**
            builder.Entity<Bedrijf>()
                .HasMany(b => b.ZakelijkeHuurders)
                .WithOne(z => z.Bedrijf)
                .HasForeignKey(z => z.BedrijfId)
                .OnDelete(DeleteBehavior.Cascade);

            // **Relatie WagenparkBeheerder -> ZakelijkeHuurders**
            builder.Entity<WagenparkBeheerder>()
                .HasMany(w => w.ZakelijkeHuurders)
                .WithOne(z => z.WagenparkBeheerder)
                .HasForeignKey(z => z.WagenparkBeheerderId)
                .OnDelete(DeleteBehavior.SetNull);

            // **Configure Medewerker-tabel**
            builder.Entity<Medewerker>().ToTable("Medewerkers");

            // **Configure User Initials**
            builder.Entity<User>().Property(u => u.initials).HasMaxLength(5);
        }
    }
}
