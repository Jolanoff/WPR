using backend.Models.Klanten;
using backend.Models.Voertuigen;
using System.Text.Json.Serialization;


namespace backend.Models.Aanvragen

{
    public class HuurAanvraag
    {
        public int Id { get; set; }

        public DateTime StartDatum { get; set; }
        public DateTime EindDatum { get; set; }
        public bool Status { get; set; }
        public string AardVanReis { get; set; }

        public int VerwachteKilometers { get; set; }

        //Klant 
        public int KlantId { get; set; }
        public Klant Klant { get; set; }
        //private Factuur Factuur { get; set; }
        public int VoertuigId { get; set; }
        public Voertuig Voertuig { get; set; }
         
        [JsonIgnore]
        public List<Schade> Schades { get; set; } = new List<Schade>();


    }
}
