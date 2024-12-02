using backend.Models.Klanten;
using backend.Models.Klanten.Bedrijven;
using backend.Models.Medewerkers;
using Microsoft.AspNetCore.Identity;

namespace backend.Models.Gebruiker
{
    public class User : IdentityUser
    {
        public string? initials { get; set; }
        public string? Naam { get; set; }
        public string? Adres { get; set; }

        // Relaties naar rollen
        public ParticuliereHuurder? ParticuliereHuurder { get; set; }
        public Bedrijf? Bedrijf { get; set; }
        public WagenparkBeheerder? WagenparkBeheerder { get; set; }
        public ZakelijkeHuurder? ZakelijkeHuurder { get; set; }

        public Medewerker? Medewerker { get; set; }

    }
}
