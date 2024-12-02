using backend.Models.Gebruiker;

namespace backend.Models.Klanten.Bedrijven
{
    public class WagenparkBeheerder
    {
        public int Id { get; set; }
        public string UserId { get; set; } // Buitenlandse sleutel naar User
        public User User { get; set; }

        public int BedrijfId { get; set; } // Buitenlandse sleutel naar Bedrijf
        public Bedrijf Bedrijf { get; set; }

        // Kan zakelijke huurders beheren
        public ICollection<ZakelijkeHuurder> ZakelijkeHuurders { get; set; } = new List<ZakelijkeHuurder>();
    }
}
