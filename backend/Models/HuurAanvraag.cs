using backend.Models.Voertuigen;

namespace backend.Models
{
    public class HuurAanvraag
    {
        private DateTime StartDatum { get; set; }
        private DateTime EindDatum { get; set; }
        private bool Status { get; set; }
        private string AardVanReis { get; set; }

        private int VerwachteKilometers { get; set; }
        private Klant Klant  { get; set; }
        private Factuur Factuur { get; set; }
        private Voertuig Voertuig { get; set; }

    }
}
