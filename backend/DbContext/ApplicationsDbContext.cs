using backend.Models.Gebruiker;
using backend.Models.Klanten;
using backend.Models.Klanten.Bedrijven;
using backend.Models.Medewerkers;
using backend.Models.Voertuigen;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace backend.DbContext
{
    public class ApplicationsDbContext : IdentityDbContext<User>
    {
        public ApplicationsDbContext(DbContextOptions<ApplicationsDbContext> options) : base(options)
        {

        }

        public DbSet<ParticuliereHuurder> ParticuliereHuurders { get; set; }
        public DbSet<Bedrijf> Bedrijven { get; set; }
        public DbSet<WagenparkBeheerder> WagenparkBeheerders { get; set; }
        public DbSet<ZakelijkeHuurder> ZakelijkeHuurders { get; set; }



        public DbSet<Medewerker> Medewerkers { get; set; }

        public DbSet<Voertuig> Voertuigen { get; set; }
        public DbSet<Auto> Autos { get; set; }
        public DbSet<Caravan> Caravans { get; set; }
        public DbSet<Camper> Campers { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configureer Voertuig als de basisentiteit
            builder.Entity<Voertuig>()
                .ToTable("Voertuigen");  // De tabel voor de gemeenschappelijke velden

            // Configureer Auto met een eigen tabel, maar gedeelde velden van Voertuig
            builder.Entity<Auto>()
                .ToTable("Autos")  // Een aparte tabel voor Auto
                .HasBaseType<Voertuig>();  // Auto is een subtype van Voertuig

            // Configureer Caravans en Campers, beide zullen de basisentiteit Voertuig gebruiken
            builder.Entity<Caravan>()
                .ToTable("Caravans")
                .HasBaseType<Voertuig>();

            builder.Entity<Camper>()
                .ToTable("Campers")
                .HasBaseType<Voertuig>();

            builder.Entity<User>()
               .HasOne(u => u.ParticuliereHuurder)
               .WithOne(p => p.User)
               .HasForeignKey<ParticuliereHuurder>(p => p.UserId)
               .OnDelete(DeleteBehavior.Cascade);

            // Relatie User -> Bedrijf
            builder.Entity<User>()
                .HasOne(u => u.Bedrijf)
                .WithOne(b => b.User)
                .HasForeignKey<Bedrijf>(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Relatie User -> WagenparkBeheerder
            builder.Entity<User>()
                .HasOne(u => u.WagenparkBeheerder)
                .WithOne(w => w.User)
                .HasForeignKey<WagenparkBeheerder>(w => w.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Relatie User -> ZakelijkeHuurder
            builder.Entity<User>()
                .HasOne(u => u.ZakelijkeHuurder)
                .WithOne(z => z.User)
                .HasForeignKey<ZakelijkeHuurder>(z => z.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Relatie Bedrijf -> WagenparkBeheerders
            builder.Entity<Bedrijf>()
                .HasMany(b => b.WagenparkBeheerders)
                .WithOne(w => w.Bedrijf)
                .HasForeignKey(w => w.BedrijfId)
                .OnDelete(DeleteBehavior.Cascade);

            // Relatie Bedrijf -> ZakelijkeHuurders
            builder.Entity<Bedrijf>()
                .HasMany(b => b.ZakelijkeHuurders)
                .WithOne(z => z.Bedrijf)
                .HasForeignKey(z => z.BedrijfId)
                .OnDelete(DeleteBehavior.Cascade);

            // Relatie WagenparkBeheerder -> ZakelijkeHuurders
            builder.Entity<WagenparkBeheerder>()
                .HasMany(w => w.ZakelijkeHuurders)
                .WithOne(z => z.WagenparkBeheerder)
                .HasForeignKey(z => z.WagenparkBeheerderId)
                .OnDelete(DeleteBehavior.SetNull);


            builder.Entity<User>()
            .HasOne(u => u.Medewerker)
        .WithOne(m => m.User)
        .HasForeignKey<Medewerker>(m => m.UserId)
        .OnDelete(DeleteBehavior.Cascade);

            // Configure Medewerker-tabel
            builder.Entity<Medewerker>().ToTable("Medewerkers");

        }
    }
}
