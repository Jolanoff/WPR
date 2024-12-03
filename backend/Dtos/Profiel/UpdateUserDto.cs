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

    [Required]
    public string Telefoonnummer    { get; set; }

    [Required]
    public string Straatnaam { get; set; }

    [Required, Range(1, int.MaxValue)]
    public int Huisnummer { get; set; }

    public string KvKNummer { get; set; }
}