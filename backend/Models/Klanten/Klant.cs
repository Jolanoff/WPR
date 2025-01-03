using System.Text.Json.Serialization;
using backend.Models.Aanvragen;
using backend.Models.Gebruiker;
using backend.Models.Klanten.Bedrijven;
using backend.Models.Voertuigen;

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

        [JsonIgnore]
        public List<HuurAanvraag> HuurAanvragen { get; set; } = new List<HuurAanvraag>();

        public List<Reservering>? Reserveringen { get; set; }


    }
}
