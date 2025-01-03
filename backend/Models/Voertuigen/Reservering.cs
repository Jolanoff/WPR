using backend.Models.Aanvragen;
using backend.Models.Klanten;

namespace backend.Models.Voertuigen
{
    public class Reservering
    {
        public int Id { get; set; }
        public DateTime StartDatum { get; set; }
        public DateTime EindDatum { get; set; }

        //  Klant
        public int KlantId { get; set; }
        public Klant Klant { get; set; }

        // Voertuig
        public int VoertuigId { get; set; }
        public Voertuig Voertuig { get; set; }

        //  HuurAanvraag
        public int HuurAanvraagId { get; set; }
        public HuurAanvraag HuurAanvraag { get; set; }
    }
}
