using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Auth
{
    public class RegisterUserDto
    {
        [Required]
        [StringLength(50, ErrorMessage = "Username cannot be longer than 50 characters.")]
        public string UserName { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long.")]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; } // Bijvoorbeeld "Bedrijf" of "ParticuliereHuurder"

        [Phone(ErrorMessage = "Invalid phone number.")]
        public string? PhoneNumber { get; set; }

        [StringLength(50, ErrorMessage = "First name cannot be longer than 50 characters.")]
        public string? Voornaam { get; set; }

        [StringLength(50, ErrorMessage = "Last name cannot be longer than 50 characters.")]
        public string? Achternaam { get; set; }

        [StringLength(5, ErrorMessage = "Initials cannot be longer than 5 characters.")]
        public string? Initials { get; set; }

        [StringLength(100, ErrorMessage = "Street name cannot be longer than 100 characters.")]
        public string? Straatnaam { get; set; }

        public int? Huisnummer { get; set; } // Huisnummer als integer

        [StringLength(15, ErrorMessage = "KvK number cannot be longer than 15 characters.")]
        public string? KvkNummer { get; set; }
    }
}
