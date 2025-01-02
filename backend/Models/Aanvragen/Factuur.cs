using System.Text.Json.Serialization;

namespace backend.Models.Aanvragen
{
    public class Factuur
    {
        public int Id { get; set; }
        public double Bedrag { get; set; }
        public bool BetaalStatus { get; set; }
        public string BetalingsOptie { get; set; }

        public int HuurAanvraagId { get; set; }

        [JsonIgnore]
        public HuurAanvraag HuurAanvraag { get; set; }
    }
}
