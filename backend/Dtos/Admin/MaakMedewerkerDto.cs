using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Admin
{
    public class MaakMedewerkerDto
    {
        [Required]
        public string Gebruikersnaam { get; set; }
        [Required]
        public string Voornaam { get; set; }
        [Required]
        public string Achternaam { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Functie { get; set; }
        [Required]
        public string Locatie { get; set; }
        [Required]
        public string Role { get; set; }
    }
}
