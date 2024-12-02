using backend.Models.Gebruiker;

namespace backend.Models.Medewerkers
{
    public class Medewerker
    {
        public int Id { get; set; } // Primaire sleutel
        public string Naam { get; set; }
 
        public string Functie { get; set; } // "FrontOffice" of "BackOffice"

        // Relatie met User
        public string UserId { get; set; } // Buitenlandse sleutel naar User
        public User User { get; set; } // Navigatie-eigenschap
    }
}
