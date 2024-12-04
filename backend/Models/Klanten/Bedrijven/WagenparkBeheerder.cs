using backend.Models.Gebruiker;

namespace backend.Models.Klanten.Bedrijven
{
    public class WagenparkBeheerder
    {
        public int Id { get; set; }

        public int KlantId { get; set; } // Buitenlandse sleutel naar Klant
        public Klant Klant { get; set; } // Navigatie-eigenschap


        public int BedrijfId { get; set; } // Buitenlandse sleutel naar Bedrijf
        public Bedrijf Bedrijf { get; set; }

        // Kan zakelijke huurders beheren
        public ICollection<ZakelijkeHuurder> ZakelijkeHuurders { get; set; } = new List<ZakelijkeHuurder>();
    }
}
