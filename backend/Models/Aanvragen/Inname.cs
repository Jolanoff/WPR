using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using backend.Models.Klanten;
using backend.Models.Voertuigen;

namespace backend.Models.Aanvragen
{
    [Table("Innames")]
    public class Inname
    {
        [Key]
        public int Id { get; set; } // Primaire sleutel

        
        public int KlantId { get; set; } // Verwijzing naar Klant
        public string KlantNaam { get; set; } // Naam van de klant

        
        public int VoertuigId { get; set; } // Verwijzing naar Voertuig
        // Naam van het voertuig

        [ForeignKey(nameof(VoertuigId))]
        [JsonIgnore]
        public Voertuig Voertuig { get; set; } // Relatie naar Voertuig

        [JsonIgnore]
        public Klant Klant { get; set; }

        public string Remarks { get; set; } // Opmerkingen over de inname

        public DateTime IntakeDate { get; set; } // Datum van inname

        public DateTime IssueDate { get; set; } //Datum van uitgifte klant
        
        public DateTime ToDate {get; set;} // Datum van stopdatum huren

        
        [StringLength(50)] // Maximaal 50 tekens voor status
        public string Status { get; set; } // Status van het voertuig ("Met schade" of "Weer beschikbaar")
         public List<string>? PhotoPaths { get; set; } // Sla bestandslocaties op

    }
}
