using backend.Models.Voertuigen;

namespace backend.Models.Aanvragen
{
    public class Uitgifte
    {
        public int Id { get; set; } // Primaire sleutel
        public string CustomerName { get; set; } // Naam van de klant
        public int VoertuigId { get; set; } // Verwijzing naar het voertuig
        public Voertuig Voertuig { get; set; } // Navigatie-eigenschap naar voertuig
        public string Remarks { get; set; } // Opmerkingen
        public DateTime IssueDate { get; set; } // Datum en tijd van uitgifte
        public string Status { get; set; } // Status zoals "Uitgegeven"
    }
}