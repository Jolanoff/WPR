using backend.Models.Voertuigen;
using System.Text.Json.Serialization;

namespace backend.Models.Aanvragen
{
    public class Schade
    {
        public int Id { get; set; } 

        public string Beschrijving { get; set; }
        public string Locatie { get; set; }

        public DateTime Datum { get; set; }
        public SchadeStatus Status { get; set; } 
        //WIJ VOEGEN LATER FOTOS WNER WE WETEN WELKE TYPE FOTOS GAAN GEBRUIKEN
        //public List<byte[]>? Fotos { get; set; } = new List<byte[]>();

        public int HuurAanvraagId { get; set; }

        [JsonIgnore]
        public HuurAanvraag HuurAanvraag { get; set; }

    }

    public enum SchadeStatus
    {
        InAfwachting,
        Goedgekeurd,
        Afgewezen
    }
}
