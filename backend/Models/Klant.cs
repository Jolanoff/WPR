namespace backend.Models
{
    public class Klant
    {
        private string Naam { get; set; }
        private string Adres { get; set; }
        private string Email { get; set; }
        private string Telefoonnummer { get; set; }
        private bool AccountStatus { get; set; }
        private Schade Schade { get; set; }
    }
}
