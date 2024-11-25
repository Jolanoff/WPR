using backend.Models.Aanvragen;
namespace backend.Models.Klanten
{
    public class Klant
    {
        private string Naam { get; set; }
        private string Adres { get; set; }
        private string Email { get; set; }
        public string? Telefoonnummer { get; set; }
        private bool AccountStatus { get; set; }
        
        public Schade? Schade { get; set; }

    }
}
