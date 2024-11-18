using backend.Models.Klanten;
using backend.Models.Voertuigen;

namespace backend.Models
{
    public class Schade
    {
        private string Beschrijving {  get; set; }
        private DateTime Datum {  get; set; }
        private string Status { get; set; }
        private string[] Fotos { get; set; }
        private int ReparatieKosten { get; set; }

        private HuurAanvraag HuurAanvraag { get; set; }
        private Voertuig Voertuig {  get; set; }
    }
}
