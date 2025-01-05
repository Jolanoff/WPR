using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Aanvragen
{
    public class InnameDTO
    {
        [Required]
        [StringLength(100)]
        public string KlantNaam { get; set; } // Naam van de klant

        [Required]
        public int KlantId {get; set;} 
        [Required]
        public int VoertuigId { get; set; }

        [Required]
        public string Status { get; set; }

        public string Remarks { get; set; }

        public DateTime IntakeDate {get; set;} 
    }
}
