using System.Text.Json.Serialization;
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
        [JsonIgnore]
        public Klant? Klanten { get; set; }

        [JsonIgnore]
        public Medewerker? Medewerker { get; set; }

    }
}
