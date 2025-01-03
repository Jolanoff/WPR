using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Voertuigen;




namespace backend.Models.Aanvragen
{
    [Table("Innames")]
    public class Inname
    {
        [Key]
        public int Id { get; set; } // Primaire sleutel

        [Required]
        public int VoertuigId { get; set; } // Verwijzing naar Voertuig

        [ForeignKey(nameof(VoertuigId))]
        public Voertuig Voertuig { get; set; } // Relatie naar Voertuig

        public string Remarks { get; set; } // Opmerkingen over inname

        public string DamagePhotos { get; set; } // Opslaglocatie(s) van schadefoto's (bijv. als CSV-string)

        public DateTime IntakeDate { get; set; } // Datum van inname

        [Required]
        public string Status { get; set; } // Status van het voertuig (bijv. "Teruggebracht", "Met schade")
    }
}
