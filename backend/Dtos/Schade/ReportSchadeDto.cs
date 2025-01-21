using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Schade
{
    public class ReportSchadeDto
    {

        [Required]
        public int HuurAanvraagId { get; set; }

        [Required]
        public string Beschrijving { get; set; }

        [Required]
        public string Locatie { get; set; }
    }
}
