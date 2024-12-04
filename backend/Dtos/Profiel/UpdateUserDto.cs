using System.ComponentModel.DataAnnotations;

public class UpdateUserDto
{
    [Required]
    public string UserName { get; set; }

    [Required]
    public string Voornaam { get; set; }

    [Required]
    public string Achternaam { get; set; }

    [Required, EmailAddress]
    public string Email { get; set; }

    [Required, RegularExpression(@"^\+?[0-9\s]*$", ErrorMessage = "Invalid phone number format.")]
    public string Telefoonnummer { get; set; }

    [Required]
    public AddressDto Adres { get; set; }

    public string KvKNummer { get; set; }

    public class AddressDto
    {
        [Required]
        public string Straatnaam { get; set; }

        [Required, Range(1, int.MaxValue)]
        public int Huisnummer { get; set; }
    }
}
