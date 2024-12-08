using System.Text.Json.Serialization;

namespace backend.Models.Klanten.Bedrijven
{
    public class Bedrijf 
    {
        public int Id { get; set; }

        public int KlantId { get; set; } // Buitenlandse sleutel naar Klant
        public Klant Klant { get; set; } // Navigatie-eigenschap

        public string KvkNummer { get; set; }


        // Relaties naar medewerkers
        public ICollection<WagenparkBeheerder> WagenparkBeheerders { get; set; } = new List<WagenparkBeheerder>();
        public ICollection<ZakelijkeHuurder> ZakelijkeHuurders { get; set; } = new List<ZakelijkeHuurder>();


        [JsonIgnore]
        public ICollection<Abonnement> Abonnementen { get; set; } = new List<Abonnement>();
    }
}
