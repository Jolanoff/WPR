using backend.Models.Gebruiker;

namespace backend.Models.Klanten.Bedrijven
{
    public class Bedrijf 
    {
        public int Id { get; set; }
        public string KvkNummer { get; set; }

        public string UserId { get; set; } // Buitenlandse sleutel naar User
        public User User { get; set; } // Navigatie-eigenschap

        // Relaties naar medewerkers
        public ICollection<WagenparkBeheerder> WagenparkBeheerders { get; set; } = new List<WagenparkBeheerder>();
        public ICollection<ZakelijkeHuurder> ZakelijkeHuurders { get; set; } = new List<ZakelijkeHuurder>();
    }
}
