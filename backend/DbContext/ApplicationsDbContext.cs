﻿using backend.Models.Aanvragen;
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
        public ApplicationsDbContext(DbContextOptions<ApplicationsDbContext> options) : base(options) { }

        // DbSets
        public DbSet<Klant> Klanten { get; set; }
        public DbSet<ParticuliereHuurder> ParticuliereHuurders { get; set; }
        public DbSet<Bedrijf> Bedrijven { get; set; }
        public DbSet<WagenparkBeheerder> WagenparkBeheerders { get; set; }
        public DbSet<ZakelijkeHuurder> ZakelijkeHuurders { get; set; }
        public DbSet<Medewerker> Medewerkers { get; set; }



        public DbSet<Voertuig> Voertuigen { get; set; }

        public DbSet<Auto> Autos { get; set; }
        public DbSet<Caravan> Caravans { get; set; }
        public DbSet<Camper> Campers { get; set; }

        public DbSet<Abonnement> Abonnementen { get; set; }


        public DbSet<Schade> Schades { get; set; }
        public DbSet<HuurAanvraag> HuurAanvragen { get; set; }
        public DbSet<Reservering> Reserveringen { get; set; }
        public DbSet<Factuur> Facturen { get; set; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Gebruik standaard schema
            builder.HasDefaultSchema("applicationdb");

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

            builder.Entity<Abonnement>()
           .HasOne(a => a.Bedrijf)
           .WithMany(b => b.Abonnementen)
           .HasForeignKey(a => a.BedrijfId);
            //vraag aan docent of als bedrijf verwijdered wordt. moet de abonnoment ook verwijderd worden of moet dat blijven


            //Schade
            builder.Entity<Schade>()
                .HasOne(s => s.HuurAanvraag)
                .WithMany(h => h.Schades)
                .HasForeignKey(s => s.HuurAanvraagId)
                .OnDelete(DeleteBehavior.Cascade);

            //Huuraanvraag
            builder.Entity<HuurAanvraag>()
            .HasOne(h => h.Klant) 
            .WithMany(k => k.HuurAanvragen) 
            .HasForeignKey(h => h.KlantId) 
            .OnDelete(DeleteBehavior.Cascade); 

            // Relatie tussen HuurAanvraag en Voertuig (One-to-Many)
            builder.Entity<HuurAanvraag>()
                .HasOne(h => h.Voertuig)
                .WithMany(v => v.HuurAanvragen) 
                .HasForeignKey(h => h.VoertuigId) 
                .OnDelete(DeleteBehavior.Restrict);

            // Factuur -> HuurAanvraag
            builder.Entity<HuurAanvraag>()
              .HasOne(h => h.Factuur)
              .WithOne(f => f.HuurAanvraag)
              .HasForeignKey<Factuur>(f => f.HuurAanvraagId)
              .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Reservering>()
            .HasOne(r => r.HuurAanvraag)
            .WithMany()
            .HasForeignKey(r => r.HuurAanvraagId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Reservering>()
            .HasOne(r => r.Klant)
            .WithMany(k => k.Reserveringen) 
            .HasForeignKey(r => r.KlantId)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Reservering>()
                .HasOne(r => r.Voertuig)
                .WithMany(v => v.Reserveringen) 
                .HasForeignKey(r => r.VoertuigId)
                .OnDelete(DeleteBehavior.Restrict);

            // **Configure Medewerker-tabel**
            builder.Entity<Medewerker>().ToTable("Medewerkers");

            // **Configure User Initials**
            builder.Entity<User>().Property(u => u.initials).HasMaxLength(5);
        }
    }
}
