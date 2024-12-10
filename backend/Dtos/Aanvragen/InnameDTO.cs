using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Aanvragen
{
    public class InnameDTO
    {
        [Required]
        public int VoertuigId { get; set; }

        [Required]
        public string Status { get; set; }

        public string Remarks { get; set; }

        public List<IFormFile> Photos { get; set; } // Foto's als bestanden
    }
}
