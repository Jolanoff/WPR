using backend.Models.Gebruiker;
using backend.Models.Klanten.Bedrijven;

namespace backend.Models.Klanten
{
    public class ZakelijkeHuurder
    {
        public int Id { get; set; }

        public int KlantId { get; set; } // Buitenlandse sleutel naar Klant
        public Klant Klant { get; set; } // Navigatie-eigenschap


        public int BedrijfId { get; set; } // Buitenlandse sleutel naar Bedrijf
        public Bedrijf Bedrijf { get; set; }

        public int? WagenparkBeheerderId { get; set; } // Optionele koppeling naar WagenparkBeheerder
        public WagenparkBeheerder? WagenparkBeheerder { get; set; }
    }
}
