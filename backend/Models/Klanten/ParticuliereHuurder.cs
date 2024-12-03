using backend.Models.Gebruiker;

namespace backend.Models.Klanten
{
    public class ParticuliereHuurder
    {
        public int Id { get; set; }
        public int KlantId { get; set; } // Buitenlandse sleutel naar Klant
        public Klant Klant { get; set; } // Navigatie-eigenschap


    }
}
