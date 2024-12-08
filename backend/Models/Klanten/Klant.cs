using System.Text.Json.Serialization;
using backend.Models.Gebruiker;
using backend.Models.Klanten.Bedrijven;

namespace backend.Models.Klanten
{
    public class Klant
    {
        public int Id { get; set; }
        public string UserId {  get; set; }
        public User User { get; set; }

        public string Straatnaam { get; set; } 
        public int Huisnummer { get; set; }

        public string KlantType { get; set; }

        [JsonIgnore]
        public Bedrijf? Bedrijf { get; set; }
        public ParticuliereHuurder? ParticuliereHuurder { get; set; }
        public ZakelijkeHuurder? ZakelijkeHuurder { get; set; }

        public WagenparkBeheerder? WagenparkBeheerder { get; set; }


    }
}
