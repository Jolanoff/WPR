using backend.Models.Klanten;
using backend.Models.Medewerkers;
using Microsoft.AspNetCore.Identity;

namespace backend.Models.Gebruiker
{
    public class User : IdentityUser
    {
        public string? initials { get; set; }
        public string? Voornaam { get; set; }
        public string? Achternaam { get; set; }


        // Relaties naar rollen
        public Klant? Klanten { get; set; }

        public Medewerker? Medewerker { get; set; }

    }
}
