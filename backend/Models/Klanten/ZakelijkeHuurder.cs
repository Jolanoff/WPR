using backend.Models.Gebruiker;
using backend.Models.Klanten.Bedrijven;

namespace backend.Models.Klanten
{
    public class ZakelijkeHuurder
    {
        public int Id { get; set; }

        public int KlantId { get; set; }
        public Klant Klant { get; set; } 


        public int BedrijfId { get; set; } 
        public Bedrijf Bedrijf { get; set; }

        public int? WagenparkBeheerderId { get; set; } 
        public WagenparkBeheerder? WagenparkBeheerder { get; set; }
    }
}
